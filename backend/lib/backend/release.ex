defmodule Backend.Release do
  @moduledoc """
  Used for executing DB release tasks when run in production without Mix
  installed.
  """
  alias Backend.Ecomm.Product.Product
  alias Backend.Repo
  import HTTPoison
  @app :backend

  def migrate do
    load_app()

    for repo <- repos() do
      {:ok, _, _} = Ecto.Migrator.with_repo(repo, &Ecto.Migrator.run(&1, :up, all: true))
      seed(repo)
    end
  end

  def seed(repo) do
    load_app()
    start_dependencies()

    api_url = "https://fakestoreapi.com/products"

    case HTTPoison.get(api_url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        products = Poison.decode!(body)

        for product <- products do
          Repo.insert!(%Product{
            title: product["title"],
            price: product["price"],
            description: product["description"],
            category: product["category"],
            image: product["image"]
          })
        end

      {:ok, %HTTPoison.Response{status_code: code}} ->
        IO.puts("Received unexpected status code: #{code}")

      {:error, %HTTPoison.Error{reason: reason}} ->
        IO.puts("HTTP request failed: #{reason}")
    end

    # for repo <- repos() do
    #   seed_from_api(repo)
    # end
  end

  # defp seed_from_api(repo) do
  #   api_url = "https://fakestoreapi.com/products"

  #   case HTTPoison.get(api_url) do
  #     {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
  #       products = Poison.decode!(body)

  #       for product <- products do
  #         Repo.insert!(%Product{
  #           title: product["title"],
  #           price: product["price"],
  #           description: product["description"],
  #           category: product["category"],
  #           image: product["image"]
  #         })
  #       end

  #     {:ok, %HTTPoison.Response{status_code: code}} ->
  #       IO.puts("Received unexpected status code: #{code}")

  #     {:error, %HTTPoison.Error{reason: reason}} ->
  #       IO.puts("HTTP request failed: #{reason}")
  #   end
  # end

  def rollback(repo, version) do
    load_app()
    {:ok, _, _} = Ecto.Migrator.with_repo(repo, &Ecto.Migrator.run(&1, :down, to: version))
  end

  defp repos do
    Application.fetch_env!(@app, :ecto_repos)
  end

  defp load_app do
    Application.load(@app)
  end

  defp start_dependencies do
    Application.ensure_all_started(:hackney)
    Application.ensure_all_started(:httpoison)
  end
end

defmodule Backend.Repo do
  use Ecto.Repo,
    otp_app: :backend,
    adapter: Ecto.Adapters.Postgres

  def init(_type, config) do
    database_url = "ecto://postgres:admin1228@db/fakestoreAPI"
    database_username = "postgres"
    database_password = "admin1228"
    database_name = "fakestoreAPI"
    database_hostname = "db"

    if database_url == nil do
      {:ok, config}
    else
      # {:ok, Keyword.put(config, :url, database_url)}
      config =
        config
        |> Keyword.put(:url, database_url)
        |> Keyword.put(:username, database_username)
        |> Keyword.put(:password, database_password)
        |> Keyword.put(:database, database_name)
        |> Keyword.put(:hostname, database_hostname)

      {:ok, config}
    end
  end
end

 
 defmodule Backend.Repo.Migrations.Seeder do
 use Ecto.Migration
    alias Backend.Ecomm.Product.Product
  alias Backend.Repo
 Application.ensure_all_started(:hackney)


  api_url = "https://fakestoreapi.com/products"

  case HTTPoison.get(api_url) do
    {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
      products = Poison.decode!(body)

      IO.inspect(products)

      for product <- products do
        Repo.insert!(%Product{
          title: product["title"],
          price: product["price"],
          description: product["description"],
          category: product["category"],
          image: product["image"]
        })
      end
  end
 end
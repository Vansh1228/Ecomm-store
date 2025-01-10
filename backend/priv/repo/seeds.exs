# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Backend.Repo.insert!(%Backend.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
defmodule Backend.Priv.Repo.Seeds do
  alias Backend.Ecomm.Product.Product
  alias Backend.Repo

  def seeder do
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
end

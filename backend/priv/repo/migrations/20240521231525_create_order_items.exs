defmodule Backend.Repo.Migrations.CreateOrderItems do
  use Ecto.Migration
    alias Backend.Ecomm.Product.Product
  alias Backend.Repo
 Application.ensure_all_started(:hackney)

  def change do
    create table(:order_items) do
      add :quantity, :integer
      add :order_id, references(:orders, on_delete: :nothing)
      add :product_id, references(:products, on_delete: :nothing)

      timestamps(type: :utc_datetime)

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

    create index(:order_items, [:order_id])
    create index(:order_items, [:product_id])
  end
end

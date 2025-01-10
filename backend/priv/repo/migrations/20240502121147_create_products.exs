defmodule Backend.Repo.Migrations.CreateProducts do
  use Ecto.Migration
  alias Backend.Ecomm.Product.Product
  alias Backend.Repo
   

  def change do
    create table(:products) do
      add :title, :string
      add :price, :decimal
      add :description, :text
      add :category, :string
      add :image, :string

      timestamps(type: :utc_datetime)
    end
  end
end

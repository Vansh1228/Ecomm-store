defmodule Backend.Repo.Migrations.CreateCarts do
  use Ecto.Migration

  def change do
    create table(:carts) do
      add :quantity, :integer
      add :user_id, references(:users, on_delete: :nothing), primary_key: true
      add :product_id, references(:products, on_delete: :nothing), primary_key: true

      timestamps(type: :utc_datetime)
    end

    # create index(:carts, [:user_id])
    # create index(:carts, [:product_id])
    create unique_index(:carts, [:user_id, :product_id])
  end
end

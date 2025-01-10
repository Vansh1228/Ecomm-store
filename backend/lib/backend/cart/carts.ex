defmodule Backend.Cart.Carts do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Ecomm.Product.Product
  alias Backend.Accounts.User
  @derive {Jason.Encoder, only: [:id, :quantity, :user_id, :user, :product_id, :product]}
  schema "carts" do
    field :quantity, :integer
    belongs_to :user, User, primary_key: true
    belongs_to :product, Product, primary_key: true

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(carts, attrs) do
    carts
    |> cast(attrs, [:quantity, :product_id, :user_id])
    |> validate_required([:quantity, :product_id, :user_id])
  end
end

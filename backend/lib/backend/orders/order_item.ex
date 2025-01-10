defmodule Backend.Orders.OrderItem do
  use Ecto.Schema
  import Ecto.Changeset
  @derive {Jason.Encoder, only: [:id, :quantity, :order_id, :product_id]}
  schema "order_items" do
    field :quantity, :integer
    belongs_to :order, Backend.Orders.Order
    belongs_to :product, Backend.Ecomm.Product.Product
    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(order_item, attrs) do
    order_item
    |> cast(attrs, [:quantity])
    |> validate_required([:quantity])
  end
end

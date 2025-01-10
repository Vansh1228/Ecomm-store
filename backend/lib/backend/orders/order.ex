defmodule Backend.Orders.Order do
  use Ecto.Schema
  import Ecto.Changeset
  @derive {Jason.Encoder, only: [:user_id, :id]}
  schema "orders" do
    # field :user_id, :id
    belongs_to :user, Backend.Accounts.User
    # has_many :order_items, Backend.Orders.OrderItem

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(order, attrs) do
    order
    |> cast(attrs, [])
    |> validate_required([])
  end
end

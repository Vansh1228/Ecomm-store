defmodule Backend.Ecomm.Product.Product do
  # use Ecto.Schema
  # import Ecto.Changeset
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query
  @derive {Jason.Encoder, only: [:id, :title, :price, :description, :image, :category]}

  # defstruct [:id, :title, :price, :description, :image, :category]

  schema "products" do
    field :category, :string
    field :description, :string
    field :image, :string
    field :price, :decimal
    field :title, :string
    # belongs_to :carts, Backend.Cart.Carts

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(product, attrs) do
    product
    |> cast(attrs, [:title, :price, :description, :category, :image])
    |> validate_required([:title, :price, :description, :category, :image])
  end
end

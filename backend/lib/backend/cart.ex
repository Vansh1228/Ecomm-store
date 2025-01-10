defmodule Backend.Cart do
  @moduledoc """
  The Cart context.
  """

  import Ecto.Query, warn: false
  alias Backend.Repo

  alias Backend.Cart.Carts

  @doc """
  Returns the list of carts.

  ## Examples

      iex> list_carts()
      [%Carts{}, ...]

  """
  def list_carts do
    Repo.all(Carts)
  end

  @doc """
  Gets a single carts.

  Raises `Ecto.NoResultsError` if the Carts does not exist.

  ## Examples

      iex> get_carts!(123)
      %Carts{}

      iex> get_carts!(456)
      ** (Ecto.NoResultsError)

  """
  def get_carts!(id), do: Repo.get!(Carts, id)

  @doc """
  Creates a carts.

  ## Examples

      iex> create_carts(%{field: value})
      {:ok, %Carts{}}

      iex> create_carts(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_carts(attrs \\ %{}) do
    %Carts{}
    |> Carts.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a carts.

  ## Examples

      iex> update_carts(carts, %{field: new_value})
      {:ok, %Carts{}}

      iex> update_carts(carts, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_carts(%Carts{} = carts, attrs) do
    carts
    |> Carts.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a carts.

  ## Examples

      iex> delete_carts(carts)
      {:ok, %Carts{}}

      iex> delete_carts(carts)
      {:error, %Ecto.Changeset{}}

  """
  def delete_carts(%Carts{} = carts) do
    Repo.delete(carts)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking carts changes.

  ## Examples

      iex> change_carts(carts)
      %Ecto.Changeset{data: %Carts{}}

  """
  def change_carts(%Carts{} = carts, attrs \\ %{}) do
    Carts.changeset(carts, attrs)
  end

  def add_to_cart(product_id, user_id) do
    Repo.insert(
      %Carts{user_id: user_id, product_id: product_id, quantity: 1},
      conflict_target: [:user_id, :product_id],
      on_conflict: [inc: [quantity: 1]]
    )
  end

  def remove_from_cart(product_id, user_id) do
    case Repo.get_by(Backend.Cart.Carts, user_id: user_id, product_id: product_id) do
      %Backend.Cart.Carts{} = cart ->
        new_quantity = cart.quantity - 1

        if new_quantity > 0 do
          cart
          |> Backend.Cart.Carts.changeset(%{quantity: new_quantity})
          |> Repo.update()
        else
          Repo.delete(cart)
        end
    end
  end
end

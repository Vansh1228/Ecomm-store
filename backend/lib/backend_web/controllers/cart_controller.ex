defmodule BackendWeb.CartController do
  use BackendWeb, :controller

  alias Backend.Repo
  import Ecto.Query
  alias Backend.Cart.Carts
  alias Backend.Ecomm.Product.Product
  alias Backend.Accounts.User
  import Plug.Conn

  def index(conn, %{"user_id" => user_id}) do
    cart_items =
      from c in Backend.Cart.Carts,
        where: c.user_id == ^user_id,
        preload: [:product, :user]

    cart_items = Repo.all(cart_items)

    send_resp(conn, 200, Jason.encode!(cart_items))
  end

  def add_to_cart(conn, %{"product_id" => product_id, "user_id" => user_id}) do
    case Backend.Cart.add_to_cart(product_id, user_id) do
      {:ok, _cart} ->
        send_resp(conn, 200, Jason.encode!(%{message: "Item added to cart successfully"}))

      {:error, reason} ->
        send_resp(conn, 400, %{error: reason})
    end
  end

  def remove_from_cart(conn, %{"product_id" => product_id, "user_id" => user_id}) do
    case Backend.Cart.remove_from_cart(product_id, user_id) do
      {:ok, _cart} ->
        send_resp(conn, 200, Jason.encode!(%{message: "Item removed from cart successfully"}))

      {:error, reason} ->
        send_resp(conn, 400, %{error: reason})
    end
  end
end

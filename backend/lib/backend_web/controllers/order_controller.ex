defmodule BackendWeb.OrderController do
  use BackendWeb, :controller
  alias Backend.Orders
  alias Backend.Repo
  alias Backend.Orders.OrderItem
  alias Backend.Ecomm.Product.Product
  plug Guardian.Plug.EnsureAuthenticated when action in [:place_order, :get_order_items]

  def place_order(conn, _params) do
    user = Guardian.Plug.current_resource(conn)

    case Orders.place_order(user.id) do
      {:ok, _order} ->
        send_resp(conn, 200, "Order placed successfully")

      {:error, reason} ->
        send_resp(conn, 400, reason)
    end
  end

  def get_order_items(conn, _params) do
    user = Guardian.Plug.current_resource(conn)

    Orders.view_orders(user.id)
    order_items = Orders.view_orders(user.id)
    send_resp(conn, 200, Jason.encode!(%{orders: order_items}))
  end
end

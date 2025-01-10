defmodule BackendWeb.ViewProductController do
  use BackendWeb, :controller
  import Jason.Encode
  alias Backend.Repo
  alias Backend.Ecomm.Product.Product

  def show(conn, %{"id" => id}) do
    view_product = get_product!(id)

    IO.inspect(view_product)

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(:ok, Jason.encode!(view_product))
  end

  def get_product!(id), do: Repo.get!(Product, id)
end

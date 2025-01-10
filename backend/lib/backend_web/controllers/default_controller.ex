defmodule BackendWeb.DefaultController do
  use BackendWeb, :controller

  import Jason.Encode
  alias Backend.Repo
  alias Backend.Ecomm.Product.Product

  def index(conn, _params) do
    products = Repo.all(Product)
    IO.inspect(products)

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(:ok, Jason.encode!(products))
  end
end

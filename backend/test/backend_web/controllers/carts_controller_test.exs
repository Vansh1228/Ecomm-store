defmodule BackendWeb.CartsControllerTest do
  use BackendWeb.ConnCase

  import Backend.CartFixtures

  alias Backend.Cart.Carts

  @create_attrs %{
    quantity: 42
  }
  @update_attrs %{
    quantity: 43
  }
  @invalid_attrs %{quantity: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all carts", %{conn: conn} do
      conn = get(conn, ~p"/api/carts")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create carts" do
    test "renders carts when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/carts", carts: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/carts/#{id}")

      assert %{
               "id" => ^id,
               "quantity" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/carts", carts: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update carts" do
    setup [:create_carts]

    test "renders carts when data is valid", %{conn: conn, carts: %Carts{id: id} = carts} do
      conn = put(conn, ~p"/api/carts/#{carts}", carts: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/carts/#{id}")

      assert %{
               "id" => ^id,
               "quantity" => 43
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, carts: carts} do
      conn = put(conn, ~p"/api/carts/#{carts}", carts: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete carts" do
    setup [:create_carts]

    test "deletes chosen carts", %{conn: conn, carts: carts} do
      conn = delete(conn, ~p"/api/carts/#{carts}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/carts/#{carts}")
      end
    end
  end

  defp create_carts(_) do
    carts = carts_fixture()
    %{carts: carts}
  end
end

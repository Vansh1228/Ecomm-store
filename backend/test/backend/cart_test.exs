defmodule Backend.CartTest do
  use Backend.DataCase

  alias Backend.Cart

  describe "carts" do
    alias Backend.Cart.Carts

    import Backend.CartFixtures

    @invalid_attrs %{quantity: nil}

    test "list_carts/0 returns all carts" do
      carts = carts_fixture()
      assert Cart.list_carts() == [carts]
    end

    test "get_carts!/1 returns the carts with given id" do
      carts = carts_fixture()
      assert Cart.get_carts!(carts.id) == carts
    end

    test "create_carts/1 with valid data creates a carts" do
      valid_attrs = %{quantity: 42}

      assert {:ok, %Carts{} = carts} = Cart.create_carts(valid_attrs)
      assert carts.quantity == 42
    end

    test "create_carts/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Cart.create_carts(@invalid_attrs)
    end

    test "update_carts/2 with valid data updates the carts" do
      carts = carts_fixture()
      update_attrs = %{quantity: 43}

      assert {:ok, %Carts{} = carts} = Cart.update_carts(carts, update_attrs)
      assert carts.quantity == 43
    end

    test "update_carts/2 with invalid data returns error changeset" do
      carts = carts_fixture()
      assert {:error, %Ecto.Changeset{}} = Cart.update_carts(carts, @invalid_attrs)
      assert carts == Cart.get_carts!(carts.id)
    end

    test "delete_carts/1 deletes the carts" do
      carts = carts_fixture()
      assert {:ok, %Carts{}} = Cart.delete_carts(carts)
      assert_raise Ecto.NoResultsError, fn -> Cart.get_carts!(carts.id) end
    end

    test "change_carts/1 returns a carts changeset" do
      carts = carts_fixture()
      assert %Ecto.Changeset{} = Cart.change_carts(carts)
    end
  end
end

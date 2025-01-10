defmodule Backend.Ecomm.ProductTest do
  use Backend.DataCase

  alias Backend.Ecomm.Product

  describe "products" do
    alias Backend.Ecomm.Product.Product

    import Backend.Ecomm.ProductFixtures

    @invalid_attrs %{description: nil, name: nil, price: nil}

    test "list_products/0 returns all products" do
      product = product_fixture()
      assert Product.list_products() == [product]
    end

    test "get_product!/1 returns the product with given id" do
      product = product_fixture()
      assert Product.get_product!(product.id) == product
    end

    test "create_product/1 with valid data creates a product" do
      valid_attrs = %{description: "some description", name: "some name", price: "120.5"}

      assert {:ok, %Product{} = product} = Product.create_product(valid_attrs)
      assert product.description == "some description"
      assert product.name == "some name"
      assert product.price == Decimal.new("120.5")
    end

    test "create_product/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Product.create_product(@invalid_attrs)
    end

    test "update_product/2 with valid data updates the product" do
      product = product_fixture()

      update_attrs = %{
        description: "some updated description",
        name: "some updated name",
        price: "456.7"
      }

      assert {:ok, %Product{} = product} = Product.update_product(product, update_attrs)
      assert product.description == "some updated description"
      assert product.name == "some updated name"
      assert product.price == Decimal.new("456.7")
    end

    test "update_product/2 with invalid data returns error changeset" do
      product = product_fixture()
      assert {:error, %Ecto.Changeset{}} = Product.update_product(product, @invalid_attrs)
      assert product == Product.get_product!(product.id)
    end

    test "delete_product/1 deletes the product" do
      product = product_fixture()
      assert {:ok, %Product{}} = Product.delete_product(product)
      assert_raise Ecto.NoResultsError, fn -> Product.get_product!(product.id) end
    end

    test "change_product/1 returns a product changeset" do
      product = product_fixture()
      assert %Ecto.Changeset{} = Product.change_product(product)
    end
  end

  describe "products" do
    alias Backend.Ecomm.Product.Product

    import Backend.Ecomm.ProductFixtures

    @invalid_attrs %{category: nil, description: nil, image: nil, name: nil, price: nil}

    test "list_products/0 returns all products" do
      product = product_fixture()
      assert Product.list_products() == [product]
    end

    test "get_product!/1 returns the product with given id" do
      product = product_fixture()
      assert Product.get_product!(product.id) == product
    end

    test "create_product/1 with valid data creates a product" do
      valid_attrs = %{
        category: "some category",
        description: "some description",
        image: "some image",
        name: "some name",
        price: "120.5"
      }

      assert {:ok, %Product{} = product} = Product.create_product(valid_attrs)
      assert product.category == "some category"
      assert product.description == "some description"
      assert product.image == "some image"
      assert product.name == "some name"
      assert product.price == Decimal.new("120.5")
    end

    test "create_product/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Product.create_product(@invalid_attrs)
    end

    test "update_product/2 with valid data updates the product" do
      product = product_fixture()

      update_attrs = %{
        category: "some updated category",
        description: "some updated description",
        image: "some updated image",
        name: "some updated name",
        price: "456.7"
      }

      assert {:ok, %Product{} = product} = Product.update_product(product, update_attrs)
      assert product.category == "some updated category"
      assert product.description == "some updated description"
      assert product.image == "some updated image"
      assert product.name == "some updated name"
      assert product.price == Decimal.new("456.7")
    end

    test "update_product/2 with invalid data returns error changeset" do
      product = product_fixture()
      assert {:error, %Ecto.Changeset{}} = Product.update_product(product, @invalid_attrs)
      assert product == Product.get_product!(product.id)
    end

    test "delete_product/1 deletes the product" do
      product = product_fixture()
      assert {:ok, %Product{}} = Product.delete_product(product)
      assert_raise Ecto.NoResultsError, fn -> Product.get_product!(product.id) end
    end

    test "change_product/1 returns a product changeset" do
      product = product_fixture()
      assert %Ecto.Changeset{} = Product.change_product(product)
    end
  end

  describe "products" do
    alias Backend.Ecomm.Product.Product

    import Backend.Ecomm.ProductFixtures

    @invalid_attrs %{category: nil, description: nil, image: nil, price: nil, title: nil}

    test "list_products/0 returns all products" do
      product = product_fixture()
      assert Product.list_products() == [product]
    end

    test "get_product!/1 returns the product with given id" do
      product = product_fixture()
      assert Product.get_product!(product.id) == product
    end

    test "create_product/1 with valid data creates a product" do
      valid_attrs = %{
        category: "some category",
        description: "some description",
        image: "some image",
        price: "120.5",
        title: "some title"
      }

      assert {:ok, %Product{} = product} = Product.create_product(valid_attrs)
      assert product.category == "some category"
      assert product.description == "some description"
      assert product.image == "some image"
      assert product.price == Decimal.new("120.5")
      assert product.title == "some title"
    end

    test "create_product/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Product.create_product(@invalid_attrs)
    end

    test "update_product/2 with valid data updates the product" do
      product = product_fixture()

      update_attrs = %{
        category: "some updated category",
        description: "some updated description",
        image: "some updated image",
        price: "456.7",
        title: "some updated title"
      }

      assert {:ok, %Product{} = product} = Product.update_product(product, update_attrs)
      assert product.category == "some updated category"
      assert product.description == "some updated description"
      assert product.image == "some updated image"
      assert product.price == Decimal.new("456.7")
      assert product.title == "some updated title"
    end

    test "update_product/2 with invalid data returns error changeset" do
      product = product_fixture()
      assert {:error, %Ecto.Changeset{}} = Product.update_product(product, @invalid_attrs)
      assert product == Product.get_product!(product.id)
    end

    test "delete_product/1 deletes the product" do
      product = product_fixture()
      assert {:ok, %Product{}} = Product.delete_product(product)
      assert_raise Ecto.NoResultsError, fn -> Product.get_product!(product.id) end
    end

    test "change_product/1 returns a product changeset" do
      product = product_fixture()
      assert %Ecto.Changeset{} = Product.change_product(product)
    end
  end
end

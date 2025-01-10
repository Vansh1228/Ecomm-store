defmodule Backend.Ecomm.ProductFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Backend.Ecomm.Product` context.
  """

  @doc """
  Generate a product.
  """
  def product_fixture(attrs \\ %{}) do
    {:ok, product} =
      attrs
      |> Enum.into(%{
        description: "some description",
        name: "some name",
        price: "120.5"
      })
      |> Backend.Ecomm.Product.create_product()

    product
  end

  @doc """
  Generate a product.
  """
  def product_fixture(attrs \\ %{}) do
    {:ok, product} =
      attrs
      |> Enum.into(%{
        category: "some category",
        description: "some description",
        image: "some image",
        name: "some name",
        price: "120.5"
      })
      |> Backend.Ecomm.Product.create_product()

    product
  end

  @doc """
  Generate a product.
  """
  def product_fixture(attrs \\ %{}) do
    {:ok, product} =
      attrs
      |> Enum.into(%{
        category: "some category",
        description: "some description",
        image: "some image",
        price: "120.5",
        title: "some title"
      })
      |> Backend.Ecomm.Product.create_product()

    product
  end
end

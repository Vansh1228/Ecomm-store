defmodule Backend.OrdersFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Backend.Orders` context.
  """

  @doc """
  Generate a order.
  """
  def order_fixture(attrs \\ %{}) do
    {:ok, order} =
      attrs
      |> Enum.into(%{})
      |> Backend.Orders.create_order()

    order
  end

  @doc """
  Generate a order_item.
  """
  def order_item_fixture(attrs \\ %{}) do
    {:ok, order_item} =
      attrs
      |> Enum.into(%{
        quantity: 42
      })
      |> Backend.Orders.create_order_item()

    order_item
  end
end

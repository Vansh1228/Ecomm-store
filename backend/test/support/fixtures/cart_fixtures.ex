defmodule Backend.CartFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Backend.Cart` context.
  """

  @doc """
  Generate a carts.
  """
  def carts_fixture(attrs \\ %{}) do
    {:ok, carts} =
      attrs
      |> Enum.into(%{
        quantity: 42
      })
      |> Backend.Cart.create_carts()

    carts
  end
end

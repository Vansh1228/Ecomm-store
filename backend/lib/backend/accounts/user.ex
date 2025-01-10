defmodule Backend.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Queryable
  @derive {Jason.Encoder, only: [:id, :email, :full_name, :password_hash]}
  schema "users" do
    field :email, :string
    field :full_name, :string
    field :password_hash, :string
    # has_many :orders, Backend.Orders.Order

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:full_name, :email, :password_hash])
    |> validate_required([:full_name, :email, :password_hash])
    |> unique_constraint(:email)
    |> put_password_hash()
  end

  defp put_password_hash(
         %Ecto.Changeset{valid?: true, changes: %{password_hash: password_hash}} = changeset
       ) do
    change(changeset, password_hash: Bcrypt.hash_pwd_salt(password_hash))
  end

  defp put_password_hash(changeset), do: changeset
end

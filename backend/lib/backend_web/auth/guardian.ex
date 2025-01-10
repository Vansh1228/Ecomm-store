defmodule BackendWeb.Auth.Guardian do
  use Guardian, otp_app: :backend
  alias Backend.Accounts
  import Ecto.Query

  def subject_for_token(%{id: id}, _claims) do
    sub = to_string(id)
    {:ok, sub}
  end

  def resource_from_claims(%{"sub" => id}) do
    case Accounts.get_user!(id) do
      nil -> {:error, :not_found}
      resource -> {:ok, resource}
    end
  end

  def build_claims(claims, resource, _opts) do
    claims =
      claims
      |> Map.put("id", resource.id)
      |> Map.put("email", resource.email)

    {:ok, claims}
  end

  def authenticate(email, password) do
    case Accounts.get_account_by_email(email) do
      nil ->
        {:error, :unauthored}

      account ->
        case validate_password(password, account.password_hash) do
          true -> create_token(account)
          false -> {:error, :unauthorized}
        end
    end
  end

  defp validate_password(password, password_hash) do
    Bcrypt.verify_pass(password, password_hash)
  end

  defp create_token(account) do
    {:ok, token, _cliams} = encode_and_sign(account)
    {:ok, account, token}
  end

  def after_encode_and_sign(resource, claims, token, _options) do
    with {:ok, _} <- Guardian.DB.after_encode_and_sign(resource, claims["typ"], claims, token) do
      {:ok, token}
    end
  end

  def on_verify(claims, token, _options) do
    with {:ok, _} <- Guardian.DB.on_verify(claims, token) do
      {:ok, claims}
    end
  end

  def on_revoke(claims, token, _options) do
    with {:ok, _} <- Guardian.DB.on_revoke(claims, token) do
      {:ok, claims}
    end
  end
end

defmodule BackendWeb.AccountController do
  use BackendWeb, :controller
  alias BackendWeb.AccountView

  alias BackendWeb.{Auth.Guardian}
  alias Backend.{Accounts, Accounts.User}

  #  def show(conn, _params) do
  #   token = get_req_header(conn, "authorization")
  #   |> List.first()
  #   |> String.replace("Bearer ", "")

  #   case Guardian.decode_and_verify(token) do
  #     {:ok, claims} ->
  #       IO.inspect(claims, label: "JWT Claims")
  #       conn
  #       |> put_status(:ok)
  #       |> json(%{message: "Success", claims: claims})
  #     {:error, reason} ->
  #       conn
  #       |> put_status(:unauthorized)
  #       |> json(%{message: "Invalid token", reason: reason})
  #   end
  # end

  def create(conn, %{"account" => account_params}) do
    IO.puts("(@@@@@@)")

    with {:ok, %User{} = account} <- Accounts.create_user(account_params),
         {ok, token, _claims} <- Guardian.encode_and_sign(account) do
      #   conn
      #   |> put_status(:created)
      #   |> render("account_token.json", %{account: account, token: token})
      #  response_body = AccountView.render("account_token.json", %{account: account, token: token})

      send_resp(conn, 200, Jason.encode!(%{account: account, token: token}))
    end
  end

  def sign_in(conn, %{"email" => email, "password_hash" => password_hash}) do
    case Guardian.authenticate(email, password_hash) do
      {:ok, account, token} ->
        conn = Plug.Conn.put_session(conn, :account_id, account.id)
        send_resp(conn, 200, Jason.encode!(%{account: account, token: token}))

      {:error, :unauthorized} ->
        raise ErrorResponse.Unauthorized, message: "Email or Password incorrect."
    end
  end

  def sign_out(conn, %{}) do
    account = conn.assigns[:account]
    token = Guardian.Plug.current_token(conn)
    Guardian.revoke(token)
    conn = Plug.Conn.clear_session()
    send_resp(conn, 200, Jason.encode!(%{account: account, token: nil}))
  end

  def show(conn, %{"id" => id}) do
    account = Accounts.get_user!(id)
    send_resp(conn, 200, Jason.encode!(%{account: conn.assigns.account}))
  end
end

defmodule BackendWeb.Auth.SetAccount do
  import Plug.Conn
  alias Backend.Accounts
  alias BackendWeb.Auth.ErrorResponse.Unauthorized

  def init(_options) do
  end

  def call(conn, _options) do
    if conn.assigns[:account] do
      conn
      IO.inspect(conn)
    else
      account_id = Plug.Conn.get_session(conn, :account_id)

      if account_id == nil, do: raise(ErrorResponse.Unauthorized)
      IO.puts(account_id)
      IO.inspect(conn)

      account = Accounts.get_user!(account_id)

      cond do
        account_id && account ->
          assign(conn, :account, account)

        true ->
          assign(conn, :account, nil)
          IO.inspect(conn)
      end
    end
  end
end

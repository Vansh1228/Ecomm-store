defmodule BackendWeb.AccountView do
  use BackendWeb, :view
  alias BackendWeb.AccountView

  def render("account_token.json", %{account: account, token: token}) do
    %{
      id: account.id,
      email: account.email,
      token: token
    }
  end
end

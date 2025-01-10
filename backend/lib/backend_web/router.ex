defmodule BackendWeb.Router do
  use BackendWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
  end

  scope "/api", BackendWeb do
    pipe_through [:api, :auth]

    get "/", DefaultController, :index
    post "/accounts/create", AccountController, :create
    post "/accounts/sign_in", AccountController, :sign_in
    get "/orders/:user_id", OrderController, :get_order_items
  end

  pipeline :view_product do
    plug :accepts, ["json"]
  end

  pipeline :auth do
    # plug BackendWeb.Auth.Pipeline
    # plug BackendWeb.Auth.SetAccount
  end

  pipeline :cart_items do
    plug :accepts, ["json"]
  end

  scope "/viewproduct", BackendWeb do
    pipe_through [:view_product]
    get "/:id", ViewProductController, :show
  end

  scope "/cartitems", BackendWeb do
    pipe_through [:cart_items]
    get "/:user_id", CartController, :index
    post "/add_to_cart", CartController, :add_to_cart
    post "/remove_from_cart", CartController, :remove_from_cart
    post "/place_order", OrderController, :place_order
  end

  scope "/api", BackendWeb do
    pipe_through [:api, :auth]
    get "/accounts/by_id/:id", AccountController, :show
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:backend, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: BackendWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end

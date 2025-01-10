# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :backend,
  ecto_repos: [Backend.Repo],
  generators: [timestamp_type: :utc_datetime]

# Configures the endpoint
config :backend, BackendWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Bandit.PhoenixAdapter,
  render_errors: [
    formats: [json: BackendWeb.ErrorJSON],
    layout: false
  ],
  server: true,
  pubsub_server: Backend.PubSub,
  live_view: [signing_salt: "mpGOpUa5"]

config :backend, BackendWeb.Auth.Guardian,
  issuer: "backend",
  secret_key: "9Sc38Qglr2zWSRozCWveACdKn+BV7bv3sESazW+OH6VKhFeIik/c4Ek1t+h0u16q"

config :backend, BackendWeb.Auth.Pipeline,
  module: BackendWeb.Guardian,
  error_handler: BackendWeb.Auth.GuardianErrorHandler

config :cors_plug,
  origin: ["*"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  headers: ["Authorization", "Content-Type"],
  max_age: 86400,
  credentials: true

config :guardian, Guardian.DB,
  # Add your repository module
  repo: Backend.Repo,
  # default
  schema_name: "guardian_tokens",
  # default: 60 minutes
  sweep_interval: 60

# Configures the mailer
#
# By default it uses the "Local" adapter which stores the emails
# locally. You can see the emails in your browser, at "/dev/mailbox".
#
# For production it's recommended to configure a different adapter
# at the `config/runtime.exs`.
config :backend, Backend.Mailer, adapter: Swoosh.Adapters.Local

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"

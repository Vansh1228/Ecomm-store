import Config

# Configures Swoosh API Client
config :swoosh, api_client: Swoosh.ApiClient.Finch, finch_name: Backend.Finch

# Disable Swoosh Local Memory Storage
config :swoosh, local: false

# Do not print debug messages in production
config :logger, level: :info

# Runtime production configuration, including reading
# of environment variables, is done on config/runtime.exs.
config :backend, BackendWeb.Endpoint,
  http: [ip: {0, 0, 0, 0, 0, 0, 0, 0}, port: {:system, "PORT"}],
  url: [host: "localhost", port: {:system, "PORT"}],
  cache_static_manifest: "priv/static/cache_manifest.json",
  server: true,
  root: ".",
  version: Application.spec(:backend, :vsn),
  load_from_system_env: true,
  secret_key_base: "a1AGOg4T9mmnrPkH+yZNOZK8p7jVoMUQehuqISdBOCjjeNGzUIsWJjn32ItObwFQ"

config :backend, :node,
  name: "backend@localhost",
  cookie: :"wZ7K/|q7TzX%ilqVdW6bv^WCZ|TdrL4cqe.s2vf3)!@)iqWu2C{U}<;630(*vC53"

config :backend, Backend.Repo,
  url: "ecto://postgres:admin1228@db:5433/fakestoreAPI",
  # socket_options: [:inet6],
  pool_size: 10

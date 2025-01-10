use Mix.Config
# Import all plugins from `rel/plugins`
# They can then be used by adding `plugin MyPlugin` to
# either an environment, or release definition, where
# `MyPlugin` is the name of the plugin module.
~w(rel plugins *.exs)
|> Path.join()
|> Path.wildcard()
|> Enum.map(&Code.eval_file(&1))

use Distillery.Releases.Config,
    # This sets the default release built by `mix distillery.release`
    default_release: :default,
    # This sets the default environment used by `mix distillery.release`
    default_environment: Mix.env()

# For a full list of config options for both releases
# and environments, visit https://hexdocs.pm/distillery/config/distillery.html


# You may define one or more environments in this file,
# an environment's settings will override those of a release
# when building in that environment, this combination of release
# and environment configuration is called a profile

environment :dev do
  # If you are running Phoenix, you should make sure that
  # server: true is set and the code reloader is disabled,
  # even in dev mode.
  # It is recommended that you build with MIX_ENV=prod and pass
  # the --env flag to Distillery explicitly if you want to use
  # dev mode.
  set dev_mode: true
  set include_erts: false
  set cookie: :"pO*d{Q(R$<LLvwtYPes@x7?M{V84cd1G~1PPK?><`G]z)Hp6<%[(:Bp3}puGK/^t"
end

environment :prod do
  set include_erts: true
  set include_src: false
  set cookie: :"wZ7K/|q7TzX%ilqVdW6bv^WCZ|TdrL4cqe.s2vf3)!@)iqWu2C{U}<;630(*vC53"
  set vm_args: "rel/vm.args"
end

# You may define one or more releases in this file.
# If you have not set a default release, or selected one
# when running `mix distillery.release`, the first release in the file
# will be used by default

release :backend do
  set version: current_version(:backend)
  set applications: [
    :runtime_tools
  ]
    set config_providers: [
    {Distillery.Releases.Config.Providers.Elixir, ["${/home/turbo/E commerce/Ecomm-store/backend/rel}/config.exs"]}
  ]
  set overlays: [
    {:copy, "rel/config.exs", "/config.exs"}
  ]
end

config :backend, Backend.Repo,
  username: System.get_env("DB_USERNAME"),
  password: System.get_env("DB_PASSWORD"),
  hostname: System.get_env("DB_HOST"),
  database: System.get_env("DB_NAME")

config :backend, BackendWeb.Endpoint,
  # Binding to loopback ipv4 address prevents access from other machines.
  # Change to `ip: {0, 0, 0, 0}` to allow access from other machines.
  http: [ip: {0,0,0,0}, port: 4000],
  check_origin: false,
  code_reloader: true,
  debug_errors: true,
  secret_key_base: "Ppocm3AjmC+Bjl4o0YX9Yyd0MrLGQk6fReGY7c2ZDrWi2zW1FvW5ZfekK7uBoaYi",
  watchers: []

# # Find eligible builder and runner images on Docker Hub. We use Ubuntu/Debian
# # instead of Alpine to avoid DNS resolution issues in production.
# #
# # https://hub.docker.com/r/hexpm/elixir/tags?page=1&name=ubuntu
# # https://hub.docker.com/_/ubuntu?tab=tags
# #
# # This file is based on these images:
# #
# #   - https://hub.docker.com/r/hexpm/elixir/tags - for the build image
# #   - https://hub.docker.com/_/debian?tab=tags&page=1&name=bullseye-20230202-slim - for the release image
# #   - https://pkgs.org/ - resource for finding needed packages
# #   - Ex: hexpm/elixir:1.14.0-erlang-25.2.3-debian-bullseye-20230202-slim
# #
# ARG ELIXIR_VERSION=1.14.0
# ARG OTP_VERSION=25.2.3
# ARG DEBIAN_VERSION=bullseye-20230202-slim

# ARG BUILDER_IMAGE="hexpm/elixir:${ELIXIR_VERSION}-erlang-${OTP_VERSION}-debian-${DEBIAN_VERSION}"
# ARG RUNNER_IMAGE="debian:${DEBIAN_VERSION}"

# FROM ${BUILDER_IMAGE} as builder

# # install build dependencies
# RUN apt-get update -y && apt-get install -y build-essential git \
#     && apt-get clean && rm -f /var/lib/apt/lists/*_*

# # prepare build dir
# WORKDIR /app

# # install hex + rebar
# RUN mix local.hex --force && \
#     mix local.rebar --force

# # set build ENV
# ENV MIX_ENV="prod"

# # install mix dependencies
# COPY mix.exs mix.lock ./
# RUN mix deps.get --only $MIX_ENV
# RUN mkdir config

# # copy compile-time config files before we compile dependencies
# # to ensure any relevant config change will trigger the dependencies
# # to be re-compiled.
# COPY config/config.exs config/${MIX_ENV}.exs config/
# # RUN mix phx.digest
# RUN mix deps.compile

# COPY priv priv

# COPY lib lib
# COPY docker_dev_start.sh docker_dev_start.sh
# # Compile the release
# RUN mix compile

# # Changes to config/runtime.exs don't require recompiling the code
# COPY config/runtime.exs config/

# COPY rel rel
# RUN mix release

# # start a new build stage so that the final image will only contain
# # the compiled release and other runtime necessities
# FROM ${RUNNER_IMAGE}

# RUN apt-get update -y && \
#   apt-get install -y libstdc++6 openssl libncurses5 locales ca-certificates \
#   && apt-get clean && rm -f /var/lib/apt/lists/*_*

# # Set the locale
# RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && locale-gen

# ENV LANG en_US.UTF-8
# ENV LANGUAGE en_US:en
# ENV LC_ALL en_US.UTF-8

# WORKDIR "/app"
# RUN chown nobody /app

# # set runner ENV
# ENV MIX_ENV="prod"

# # Only copy the final release from the build stage
# COPY --from=builder --chown=nobody:root /app/_build/${MIX_ENV}/rel/backend ./

# USER nobody

# # If using an environment that doesn't automatically reap zombie processes, it is
# # advised to add an init process such as tini via `apt-get install`
# # above and adding an entrypoint. See https://github.com/krallin/tini for details
# # ENTRYPOINT ["/tini", "--"]
# RUN /app/bin/migrate
# CMD ["/app/bin/server"]

# Use a Debian-based Elixir image for both build and runtime stages
ARG ELIXIR_VERSION=1.14.0
ARG OTP_VERSION=25.2.3
ARG DEBIAN_VERSION=bullseye-20230202-slim

ARG BUILDER_IMAGE="hexpm/elixir:${ELIXIR_VERSION}-erlang-${OTP_VERSION}-debian-${DEBIAN_VERSION}"
ARG RUNNER_IMAGE="hexpm/elixir:${ELIXIR_VERSION}-erlang-${OTP_VERSION}-debian-${DEBIAN_VERSION}"

# Build stage
FROM ${BUILDER_IMAGE} as builder

# Install build dependencies
RUN apt-get update -y && apt-get install -y build-essential git

# Set build environment
WORKDIR /app

# Install hex + rebar
RUN mix local.hex --force && mix local.rebar --force

# Set build ENV
ENV MIX_ENV=prod

# Install mix dependencies
COPY mix.exs mix.lock ./
RUN mix deps.get --only $MIX_ENV
RUN mix phx.gen.release
RUN mkdir config

# Copy compile-time config files before we compile dependencies
COPY config/config.exs config/${MIX_ENV}.exs config/
RUN mix deps.compile

# Copy the rest of the application code
COPY . .

# Compile the release
RUN mix compile
RUN mix phx.digest
RUN MIX_ENV=dev mix release

# Runtime stage
FROM ${RUNNER_IMAGE} as runner

# Install runtime dependencies
RUN apt-get update -y && \
  apt-get install -y libstdc++6 openssl libncurses5 locales ca-certificates postgresql-client && \
  apt-get clean && rm -rf /var/lib/apt/lists/*

# Set the locale
RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && locale-gen

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

WORKDIR /app

# Set runner ENV
ENV MIX_ENV=dev
# RUN mix phx.gen.release


# Copy the release from the build stage
COPY --from=builder /app/_build/dev/rel/backend ./

# Copy entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Change ownership to nobody after setting permissions
RUN chown nobody /app

USER nobody

ENTRYPOINT ["/app/entrypoint.sh"]
# RUN  _build/prod/rel/backend/bin/migrate


# Step 1: mix release exec and run locally, db on local --this will work
# mix release on a docker image, it will generate an exec and run it. Docker image run

# postgres img integrate with backend



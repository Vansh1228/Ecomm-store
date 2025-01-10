#!/bin/sh

# Wait until the database is available
# echo "Waiting for database to be available..."
# while ! pg_isready -h db -U postgres -d fakestoreAPI; do
#   sleep 1
# done

# Run database migrations
echo "Running migrations..."
/app/bin/backend eval "Backend.Release.migrate"
# /app/bin/backend eval "Backend.Release.seed"
# /app/bin/backend  "Code.eval_file(\"/app/seed.exs\")"
# /app/bin/backend eval "Backend.Priv.Repo.Seeds.seeder"
# Start the application
echo "Starting the server..."
exec /app/bin/server
# echo "Starting the migration..."
# exec /app/bin/migrate
# echo "Starting the remote..."
# exec /app/bin/backend remote
/home/turbo/E commerce/Ecomm-store/backend/priv/repo/seeds.exs
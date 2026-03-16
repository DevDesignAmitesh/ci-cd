set -e

echo "Running Prisma migrate..."
bun prisma migrate dev -n "init"

echo "Running Prisma generate..."
bun prisma migrate generate

echo "Starting backend..."
bun run index.ts
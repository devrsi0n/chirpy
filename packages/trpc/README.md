# tRPC

This package includes database ORM, tRPC routes

## Setup dev env

```sh
docker compose up -d
```

## Development

```sh
# 1. prototyping
pnpm prisma db push
# 2. generate migration history when ready
pnpm prisma migrate dev --name <new-feature>
```

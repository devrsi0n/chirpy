# Contributing

First off, thanks for taking the time to contribute! 🙌

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Developing

Chirpy is built upon [Next.js](https://nextjs.org) and [Hasura](https://github.com/hasura/graphql-engine). To run this project locally, you'll need to install the following:

- [Docker](https://docs.docker.com/get-docker) & Docker Compose
- [nodejs@16+](https://nodejs.org) & [pnpm@7+](https://pnpm.io/)

### Fork and clone

[Fork](https://help.github.com/articles/fork-a-repo/) this repository to your
own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.

### Set up the frontend only

If you only want to make UI changes, you can skip the back-end setup and do:

```bash
pnpm install
# Copy .env-template to .env.local without any modification
cp .env-template .env.local
# See your changes in Storybook
cd apps/main
pnpm run sb
```

### Start the Hasura server

Hasura is used as the data server. You can setup a local Hasura server quickly by running the following command:

```bash
pnpm install
cd <project-root>/packages/docker-cli
# Generate Hasura docker-compose file and .env.local for main app,
# run the contianer and migrate database/metadata
pnpm run g:dev
```

### Start the frontend app

```bash
cd <project-root>/apps/main
pnpm run dev
```

## Linting

```bash
pnpm run lint
```

## Building

Build the project locally, with:

```bash
pnpm run build:local
```

## Testing

```bash
# For unit tests
pnpm run test
# For e2e tests
pnpm run cy:open
```

## Optional

### Set up more environment variables

Tweak `.env.local` and fill variables as your needs, e.g. Email server secret, Google sign-in app id/key.

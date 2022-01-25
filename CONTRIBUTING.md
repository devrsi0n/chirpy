# Contributing

First off, thanks for taking the time to contribute! 🙌

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Developing

Chirpy is built upon [Next.js](https://nextjs.org) and [Hasura](https://github.com/hasura/graphql-engine). To run this project locally, you'll need to install the following:

- [Docker](https://docs.docker.com/get-docker)
- Docker Compose
- [nodejs 14+](https://nodejs.org) & npm@6

### Fork and clone

[Fork](https://help.github.com/articles/fork-a-repo/) this repository to your
own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.

### Frontend

If you only want to make UI changes, you can skip the back-end setup and do:

```bash
npm install
# Copy .env-template to .env.local without any modification
cp .env-template .env.local
# See your changes in Storybook
npm run sb
```

### Backend

#### Start the data server

Hasura is used as the data server.

First, you need to set up a local docker config file. Copy `services/hasura/docker-compose.yaml` to `services/hasura/docker-compose.local.yaml`. Run `openssl rand -base64 172 | tr -d '\n'` to generate a random token. Copy the token and fill the `HASURA_GRAPHQL_JWT_SECRET` variable in `services/hasura/docker-compose.local.yaml`.

Then, start a local hasura server, run the following command:

```bash
cd <project-root>/services/hasura
docker-compose -f docker-compose.local.yaml up -d
```

#### Set up the database and schema

Make sure you're using a separate terminal (e.g. `iTerm2`) not a VSCode terminal, because there're some environment variable issues when using them together.

Install [Hasura CLI](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli.html) and run the following command:

```bash
cd <project-root>/services/hasura
# Set up the postgres database schema
hasura migrate apply --up all
# Set up the default enum values
hasura seed apply
# Set up the graphql schema
hasura metadata apply
```

#### Set up environment variables

Copy `.env-template` to `.env.local` and fill all blank variables with your own values.

## Linting

```bash
npm run lint
```

## Building

Build the project locally, with:

```bash
npm run build:local
```

## Testing

```bash
# For unit tests
npm run ut
# For e2e tests
npm run cy:open
```

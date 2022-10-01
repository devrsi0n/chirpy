# syntax=docker/dockerfile:1

FROM node:16-slim AS base
WORKDIR /app
ARG NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ARG NEXT_PUBLIC_ANALYTICS_DOMAIN
ENV NEXT_PUBLIC_ANALYTICS_DOMAIN=${NEXT_PUBLIC_ANALYTICS_DOMAIN}
# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED=1
ENV DOCKER=true
RUN npm --global install pnpm

FROM base AS builder
RUN apt-get -qy update && apt-get -qy --no-install-recommends install openssl git

# COPY pnpm-lock.yaml .npmrc pnpm-workspace.yaml patches ./
# RUN pnpm fetch
ADD . ./
RUN pnpm install -r --frozen-lockfile
RUN pnpm turbo run build --filter=@chirpy-dev/main-app...

FROM base AS runner

RUN apt-get -qy update \
    && apt-get -qy --no-install-recommends install \
    openssl \
    && apt-get autoremove -yq \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# USER nextjs

COPY ./apps/main/.env.docker ./apps/main/.env.production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/main/public ./apps/main/public
COPY --from=builder --chown=node:node /app/apps/main/.next/standalone ./apps/main/
COPY --from=builder --chown=node:node /app/apps/main/.next/static ./apps/main/.next/static

COPY env.sh ./
RUN chmod +x ./env.sh
# Setup env.sh config
ENV ENVSH_OUTPUT=./apps/main/public/__env.js
ENV ENVSH_ENV=./apps/main/.env.production
ENTRYPOINT ["./env.sh"]
CMD node ./apps/main/server.js

EXPOSE 3000
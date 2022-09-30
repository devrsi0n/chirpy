FROM node:16-slim AS base
WORKDIR /app
ARG NEXT_PUBLIC_HASURA_HTTP_ORIGIN
ENV NEXT_PUBLIC_HASURA_HTTP_ORIGIN=${NEXT_PUBLIC_HASURA_HTTP_ORIGIN}
ARG NEXT_PUBLIC_HASURA_WS_ORIGIN
ENV NEXT_PUBLIC_HASURA_WS_ORIGIN=${NEXT_PUBLIC_HASURA_WS_ORIGIN}
ARG NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ARG NEXT_PUBLIC_VAPID
ENV NEXT_PUBLIC_VAPID=${NEXT_PUBLIC_VAPID}
ARG NEXT_PUBLIC_ANALYTICS_DOMAIN
ENV NEXT_PUBLIC_ANALYTICS_DOMAIN=${NEXT_PUBLIC_ANALYTICS_DOMAIN}
ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ARG HASURA_ADMIN_SECRET
ENV HASURA_ADMIN_SECRET=${HASURA_ADMIN_SECRET}
ARG HASURA_EVENT_SECRET
ENV HASURA_EVENT_SECRET=${HASURA_EVENT_SECRET}
ARG HASH_ALGORITHM
ENV HASH_ALGORITHM=${HASH_ALGORITHM}
ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ARG PRIVATE_VAPID
ENV PRIVATE_VAPID=${PRIVATE_VAPID}
ARG EMAIL_API_KEY
ENV EMAIL_API_KEY=${EMAIL_API_KEY}
ARG GITHUB_CLIENT_ID
ENV GITHUB_CLIENT_ID=${GITHUB_CLIENT_ID}
ARG GITHUB_CLIENT_SECRET
ENV GITHUB_CLIENT_SECRET=${GITHUB_CLIENT_SECRET}
ARG TWITTER_CONSUMER_KEY
ENV TWITTER_CONSUMER_KEY=${TWITTER_CONSUMER_KEY}
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
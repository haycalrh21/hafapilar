ARG NODE_VERSION=20.9.0

# Alpine image
FROM node:${NODE_VERSION}-alpine AS alpine
RUN apk update
RUN apk add --no-cache libc6-compat

# Setup pnpm and turbo on the alpine base
FROM alpine AS base

# Prune projects
# FROM base AS prune
ARG PROJECT

WORKDIR /app
COPY . .
RUN npm install
# Build the project
ARG PROJECT
RUN npm run build

ENV HOSTNAME 0.0.0.0
EXPOSE 3000
# WORKDIR /app/client
CMD ["npm", "run", "start"]

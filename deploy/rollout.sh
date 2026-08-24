#!/usr/bin/env bash
# Selective VPS rollout for digital-card (single-service).
#
# Usage (on the VPS, after CI sync):
#   export IMAGE_REPO=ghcr.io/<owner>/<repo> IMAGE_TAG=<sha>
#   ./rollout.sh server

set -euo pipefail

DEPLOY_DIR="${DEPLOY_DIR:?export DEPLOY_DIR=/abs/path/to/deploy/dir (never use ~)}"
COMPOSE_FILE="${COMPOSE_FILE:-$DEPLOY_DIR/docker-compose.yml}"
TAGS_FILE="${TAGS_FILE:-$DEPLOY_DIR/service-tags.env}"
ENV_FILE="${ENV_FILE:-$DEPLOY_DIR/.env.prod}"

if [ $# -eq 0 ]; then
  echo "Usage: rollout.sh server" >&2
  exit 1
fi

if [ -z "${IMAGE_REPO:-}" ] || [ -z "${IMAGE_TAG:-}" ]; then
  echo "IMAGE_REPO and IMAGE_TAG must be set" >&2
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing $ENV_FILE — create it once from .env.prod.example (secrets never sync from CI)" >&2
  exit 1
fi

cd "$DEPLOY_DIR"

# Load persisted tag from previous deploys.
SERVER_TAG=""
if [ -f "$TAGS_FILE" ]; then
  SERVER_TAG="$(grep -E '^SERVER_IMAGE_TAG=' "$TAGS_FILE" | cut -d= -f2 || true)"
fi

# Seed from running container if no persisted tag.
if [ -z "$SERVER_TAG" ]; then
  image="$(docker inspect -f '{{.Config.Image}}' "digital-card-server" 2>/dev/null || true)"
  [ -n "$image" ] && SERVER_TAG="${image##*:}"
fi

# Apply this pipeline's tag.
for svc in "$@"; do
  [ "$svc" = "server" ] && SERVER_TAG="$IMAGE_TAG"
done

# Fallback for first-time install.
[ -z "$SERVER_TAG" ] && SERVER_TAG="$IMAGE_TAG"

echo "SERVER_IMAGE_TAG=${SERVER_TAG}" > "$TAGS_FILE"

export IMAGE_REPO
export SERVER_IMAGE_TAG="$SERVER_TAG"

COMPOSE=(docker compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" --env-file "$TAGS_FILE")

echo "Rolling out: $*"
echo "  server → ${SERVER_IMAGE_TAG}"

docker network inspect proxy >/dev/null 2>&1 || docker network create proxy >/dev/null

"${COMPOSE[@]}" up -d --wait postgres
"${COMPOSE[@]}" pull -q server
"${COMPOSE[@]}" up -d --remove-orphans server
"${COMPOSE[@]}" up -d --no-deps server-web
"${COMPOSE[@]}" restart server-web

docker image prune -f >/dev/null 2>&1 || true

echo "Rollout complete."

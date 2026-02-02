#!/usr/bin/env bash
# Post-deploy script to initialize and seed the database on the deployed backend.
# Usage (from CI or local):
#   API_URL=https://uptownstitch-upholstery.onrender.com ADMIN_TOKEN=... bash scripts/post_deploy_seed.sh

set -euo pipefail

API_URL=${API_URL:-${VITE_API_URL:-https://uptownstitch-upholstery.onrender.com}}
# Ensure base has no trailing /api
API_URL=${API_URL%/}
API_URL=${API_URL%/api}

ENDPOINT="$API_URL/api"
ADMIN_TOKEN_HEADER=""
if [ -n "${ADMIN_TOKEN-}" ]; then
  ADMIN_TOKEN_HEADER=(-H "Authorization: Bearer ${ADMIN_TOKEN}")
fi

TRIES=${TRIES:-6}
SLEEP=${SLEEP:-5}

echo "Post-deploy seed script starting against $ENDPOINT"

echo "Calling init-db..."
for i in $(seq 1 $TRIES); do
  set +e
  if [ -n "${ADMIN_TOKEN-}" ]; then
    resp=$(curl -s -S -X POST "$ENDPOINT/admin/init-db" -H "Authorization: Bearer ${ADMIN_TOKEN}" -w "HTTP:%{http_code}" -o /tmp/init_resp.txt) || true
  else
    resp=$(curl -s -S -X POST "$ENDPOINT/admin/init-db" -w "HTTP:%{http_code}" -o /tmp/init_resp.txt) || true
  fi
  set -e
  code=$(echo "$resp" | tr -d '\r' | sed -n 's/.*HTTP:\([0-9]\{3\}\).*/\1/p')
  echo "init-db response code: ${code:-unknown}"
  cat /tmp/init_resp.txt || true
  if [ "$code" = "200" ] || [ "$code" = "201" ]; then
    echo "init-db succeeded"
    break
  fi
  echo "init-db not ready, retrying in $SLEEP seconds... ($i/$TRIES)"
  sleep $SLEEP
done

echo "Calling seed..."
for i in $(seq 1 $TRIES); do
  set +e
  if [ -n "${ADMIN_TOKEN-}" ]; then
    resp=$(curl -s -S -X POST "$ENDPOINT/admin/seed" -H "Authorization: Bearer ${ADMIN_TOKEN}" -w "HTTP:%{http_code}" -o /tmp/seed_resp.txt) || true
  else
    resp=$(curl -s -S -X POST "$ENDPOINT/admin/seed" -w "HTTP:%{http_code}" -o /tmp/seed_resp.txt) || true
  fi
  set -e
  code=$(echo "$resp" | tr -d '\r' | sed -n 's/.*HTTP:\([0-9]\{3\}\).*/\1/p')
  echo "seed response code: ${code:-unknown}"
  cat /tmp/seed_resp.txt || true
  if [ "$code" = "200" ] || [ "$code" = "201" ]; then
    echo "seed succeeded"
    exit 0
  fi
  echo "seed not ready, retrying in $SLEEP seconds... ($i/$TRIES)"
  sleep $SLEEP
done

echo "Seed failed after ${TRIES} attempts" >&2
exit 1

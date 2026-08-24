# CI/CD — GitHub Actions -> GHCR -> VPS (Nginx Proxy Manager)

## Pipeline

| Trigger | What runs |
|---------|-----------|
| PR (code change) | quality + gitleaks |
| Push `main` | quality + gitleaks in parallel with image build; deploy gates on all |
| Docs-only push | change detection only (~10s) |
| Actions -> "Run workflow" | builds + deploys (bypasses path filters) |

## Deploy steps

1. CI builds Docker image, pushes to GHCR
2. Tar-syncs `deploy/docker-compose.yml`, `deploy/rollout.sh`, `deploy/web/server/nginx.conf` to `$VPS_PATH`
3. On the VPS: `docker login ghcr.io`, then `./rollout.sh server`
4. `rollout.sh`: ensure `proxy` network -> postgres up (`--wait`) -> pull image -> roll server -> restart side-car

## VPS layout (`$VPS_PATH`)

| File | Origin | Purpose |
|------|--------|---------|
| `docker-compose.yml` | synced by CI | the stack |
| `rollout.sh` | synced by CI | selective rollout |
| `web/server/nginx.conf` | synced by CI | side-car config |
| `.env.prod` | created once by hand | all secrets/config |
| `service-tags.env` | managed by rollout.sh | per-service image tag |

## Manual ops on the VPS

```bash
cd $VPS_PATH
alias dc='docker compose -f docker-compose.yml --env-file .env.prod --env-file service-tags.env'
dc ps
dc logs -f server
dc up -d --wait postgres
```

First-deploy seed:

```bash
dc exec server npx tsx prisma/seed.ts
```

## Rollback

```bash
cd $VPS_PATH
export IMAGE_REPO=ghcr.io/shoha-coder/digital-card
export IMAGE_TAG=<previous-commit-sha>
export DEPLOY_DIR=$PWD
./rollout.sh server
```

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Deploy SSH fails | key perms; user in `docker` group; host/port; dir writable |
| Files land in `~/...` dir | `VPS_PATH` contains `~` -- use absolute path |
| `network proxy not found` | `docker network create proxy` |
| `invalid reference format` | go through `rollout.sh` or `dc` alias |
| GHCR pull 401 | `GHCR_TOKEN` needs `read:packages` |
| 502 from NPM | `dc restart server-web`; check server health |
| Prisma `P1000` | role password != `.env.prod` value; `ALTER USER digital_card WITH LOGIN PASSWORD '<value>';` |

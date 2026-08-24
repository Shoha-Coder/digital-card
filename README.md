# Digital Business Card

A GraphQL API that serves structured profile data — skills, experience, projects, education — as a developer's digital business card.

## Stack

- **TypeScript** + **Node.js**
- **NestJS** — framework
- **Prisma 7** — ORM with `@prisma/adapter-pg`
- **GraphQL** — code-first (Apollo)
- **PostgreSQL** — database
- **Docker** — containerization

## Quick Start

```bash
# 1. Start the database
docker compose up -d db

# 2. Install dependencies
npm install

# 3. Copy env
cp .env.example .env

# 4. Generate Prisma client
npx prisma generate

# 5. Run migrations
npx prisma migrate dev

# 6. Seed your profile
npx tsx prisma/seed.ts

# 7. Start the server
npm run start:dev
```

Open `http://localhost:3000/graphql` for the GraphQL Playground.

## Example Query

```graphql
{
  profile(slug: "shohruh") {
    firstName
    lastName
    title
    bio
    skills {
      name
      category
      level
    }
    experiences {
      company
      role
      description
    }
    projects {
      name
      description
      techStack
    }
    educations {
      institution
      degree
      field
    }
  }
}
```

## Docker (full stack)

```bash
docker compose up -d
```

Runs both PostgreSQL and the API on `http://localhost:3000/graphql`.

## Project Structure

```
src/
  prisma/         — PrismaService (global, connection via adapter)
  profile/        — Profile module (resolver, service, model)
  skill/          — Skill module (resolver, service, model)
  experience/     — Experience model
  project/        — Project model
  education/      — Education model
prisma/
  schema.prisma   — database schema
  seed.ts         — seed script with profile data
  migrations/     — migration history
```

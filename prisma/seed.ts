import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

const connectionString = process.env['DATABASE_URL'];
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.profile.deleteMany();

  await prisma.profile.create({
    data: {
      slug: 'shohruh',
      firstName: 'Shohruh',
      lastName: 'Sobirov',
      title: 'Full-Stack Engineer (TypeScript + Go)',
      bio: 'Full-stack engineer specializing in Next.js, NestJS, and Go. I build end-to-end: from frontend architecture (Feature-Sliced Design) to backend services and CI/CD pipelines deployed to VPS. Focused on shipping production systems with clean architecture, not just prototypes.',
      email: 'arcsobirov@gmail.com',
      github: 'https://github.com/shoha-coder',
      telegram: 'https://t.me/shoha_coder',
      location: 'Tashkent, Uzbekistan',
      skills: {
        create: [
          { name: 'TypeScript', category: 'Language', level: 5, sortOrder: 0 },
          { name: 'Go', category: 'Language', level: 4, sortOrder: 1 },
          { name: 'JavaScript', category: 'Language', level: 5, sortOrder: 2 },
          { name: 'SQL', category: 'Language', level: 4, sortOrder: 3 },

          { name: 'Next.js', category: 'Frontend', level: 5, sortOrder: 10 },
          { name: 'React', category: 'Frontend', level: 5, sortOrder: 11 },
          { name: 'Tailwind CSS', category: 'Frontend', level: 5, sortOrder: 12 },
          { name: 'Feature-Sliced Design', category: 'Frontend', level: 4, sortOrder: 13 },

          { name: 'NestJS', category: 'Backend', level: 4, sortOrder: 20 },
          { name: 'Prisma', category: 'Backend', level: 4, sortOrder: 21 },
          { name: 'GraphQL', category: 'Backend', level: 3, sortOrder: 22 },
          { name: 'PostgreSQL', category: 'Backend', level: 4, sortOrder: 23 },
          { name: 'REST API', category: 'Backend', level: 5, sortOrder: 24 },
          { name: 'OpenSearch', category: 'Backend', level: 3, sortOrder: 25 },

          { name: 'Docker', category: 'DevOps', level: 4, sortOrder: 30 },
          { name: 'CI/CD (GitLab CI)', category: 'DevOps', level: 4, sortOrder: 31 },
          { name: 'Nginx', category: 'DevOps', level: 4, sortOrder: 32 },
          { name: 'Linux / VPS', category: 'DevOps', level: 4, sortOrder: 33 },
          { name: 'S3 Storage', category: 'DevOps', level: 3, sortOrder: 34 },

          { name: 'Git', category: 'Tools', level: 4, sortOrder: 40 },
          { name: 'Claude Code', category: 'Tools', level: 4, sortOrder: 41 },
        ],
      },
      experiences: {
        create: [
          {
            company: 'VSOFT',
            role: 'Full-Stack Developer',
            startDate: new Date('2025-04-01'),
            description:
              'Building logistics company admin panel and public website. Laravel + Filament backend, Next.js frontend with SSR/ISR. Set up CI/CD pipeline, Docker deployment, and S3 storage integration.',
            sortOrder: 0,
          },
          {
            company: 'National Development Community (NDC)',
            role: 'Full-Stack Developer',
            startDate: new Date('2024-08-01'),
            description:
              'Core developer on an AI-powered HR platform (Go + Next.js). Built a three-stage candidate matching engine with deterministic scoring, LLM-powered ranking, and PII anonymization. Owned the full deployment pipeline: GitLab CI, Docker, Nginx, VPS.',
            sortOrder: 1,
          },
        ],
      },
      projects: {
        create: [
          {
            name: 'HR Platform — Matching Engine',
            description:
              'Three-stage candidate-vacancy matching pipeline: SQL pre-filter, 9-factor deterministic scorer (domain, skills, salary tolerance, seniority, embeddings), and LLM-powered ranking with PII anonymization and demographic enforcement.',
            techStack: [
              'Go',
              'PostgreSQL',
              'OpenSearch',
              'Gemini API',
              'Clean Architecture',
            ],
            repoUrl:
              'https://github.com/national-development-community/hr',
            sortOrder: 0,
          },
          {
            name: 'Yumesc',
            description:
              'Restaurant platform with multi-tenant architecture, online ordering, and admin dashboard. Feature-Sliced Design frontend with SSR.',
            techStack: [
              'Next.js',
              'TypeScript',
              'Tailwind CSS',
              'FSD',
              'Docker',
              'GitLab CI',
            ],
            sortOrder: 1,
          },
          {
            name: 'Digital Business Card',
            description:
              'This project. A GraphQL API serving structured profile data, built with NestJS + Prisma + Docker.',
            techStack: [
              'NestJS',
              'TypeScript',
              'Prisma',
              'GraphQL',
              'Docker',
              'PostgreSQL',
            ],
            sortOrder: 2,
          },
        ],
      },
      educations: {
        create: [
          {
            institution: 'Tashkent University of Information Technologies (TUIT)',
            degree: 'Bachelor',
            field: 'Software Engineering',
            startYear: 2022,
            sortOrder: 0,
          },
        ],
      },
    },
  });

  console.log('Seed completed');
}

main()
  .catch((e: unknown) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => void prisma.$disconnect());

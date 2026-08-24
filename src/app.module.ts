import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProfileModule } from './profile/profile.module.js';
import { SkillModule } from './skill/skill.module.js';
import { HealthModule } from './health/health.module.js';

const isProd = process.env['NODE_ENV'] === 'production';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      playground: !isProd,
      introspection: !isProd,
    }),
    PrismaModule,
    ProfileModule,
    SkillModule,
    HealthModule,
  ],
})
export class AppModule {}

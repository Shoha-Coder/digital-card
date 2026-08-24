import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const express = app.getHttpAdapter().getInstance();
  express.get('/health', (_req: any, res: any) => res.json({ status: 'ok' }));

  const port = process.env['PORT'] ?? 3000;
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}/graphql`);
}

void bootstrap();

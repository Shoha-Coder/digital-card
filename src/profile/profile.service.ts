import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

const withRelations = {
  skills: { orderBy: { sortOrder: 'asc' as const } },
  experiences: { orderBy: { sortOrder: 'asc' as const } },
  projects: { orderBy: { sortOrder: 'asc' as const } },
  educations: { orderBy: { sortOrder: 'asc' as const } },
};

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async findBySlug(slug: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { slug },
      include: withRelations,
    });

    if (!profile) {
      throw new NotFoundException(`Profile "${slug}" not found`);
    }

    return profile;
  }

  async findAll() {
    return this.prisma.profile.findMany({
      include: withRelations,
      orderBy: { createdAt: 'desc' },
    });
  }
}

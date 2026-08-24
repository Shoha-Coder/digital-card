import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProfile(profileId: string, category?: string) {
    return this.prisma.skill.findMany({
      where: {
        profileId,
        ...(category ? { category } : {}),
      },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async categories(profileId: string) {
    const skills = await this.prisma.skill.findMany({
      where: { profileId },
      select: { category: true },
      distinct: ['category'],
      orderBy: { sortOrder: 'asc' },
    });

    return skills.map((s) => s.category);
  }
}

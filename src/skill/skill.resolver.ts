import { Resolver, Query, Args } from '@nestjs/graphql';
import { SkillModel } from './skill.model.js';
import { SkillService } from './skill.service.js';

@Resolver(() => SkillModel)
export class SkillResolver {
  constructor(private readonly skillService: SkillService) {}

  @Query(() => [SkillModel], {
    name: 'skills',
    description: 'List skills for a profile, optionally filtered by category',
  })
  async skills(
    @Args('profileId') profileId: string,
    @Args('category', { nullable: true }) category?: string,
  ) {
    return this.skillService.findByProfile(profileId, category);
  }

  @Query(() => [String], {
    name: 'skillCategories',
    description: 'List distinct skill categories for a profile',
  })
  async skillCategories(@Args('profileId') profileId: string) {
    return this.skillService.categories(profileId);
  }
}

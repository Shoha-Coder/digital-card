import { Resolver, Query, Args } from '@nestjs/graphql';
import { ProfileModel } from './profile.model.js';
import { ProfileService } from './profile.service.js';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileModel, {
    name: 'profile',
    description: 'Get a profile by its unique slug',
  })
  async profile(@Args('slug') slug: string) {
    return this.profileService.findBySlug(slug);
  }

  @Query(() => [ProfileModel], {
    name: 'profiles',
    description: 'List all profiles',
  })
  async profiles() {
    return this.profileService.findAll();
  }
}

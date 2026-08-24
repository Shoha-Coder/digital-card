import { ObjectType, Field, ID } from '@nestjs/graphql';
import { SkillModel } from '../skill/skill.model.js';
import { ExperienceModel } from '../experience/experience.model.js';
import { ProjectModel } from '../project/project.model.js';
import { EducationModel } from '../education/education.model.js';

@ObjectType('Profile')
export class ProfileModel {
  @Field(() => ID)
  id!: string;

  @Field()
  slug!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  github?: string;

  @Field({ nullable: true })
  linkedin?: string;

  @Field({ nullable: true })
  telegram?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  avatarUrl?: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field(() => [SkillModel])
  skills!: SkillModel[];

  @Field(() => [ExperienceModel])
  experiences!: ExperienceModel[];

  @Field(() => [ProjectModel])
  projects!: ProjectModel[];

  @Field(() => [EducationModel])
  educations!: EducationModel[];
}

import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType('Project')
export class ProjectModel {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String])
  techStack!: string[];

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  repoUrl?: string;

  @Field(() => Int)
  sortOrder!: number;
}

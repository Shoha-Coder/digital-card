import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType('Skill')
export class SkillModel {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  category!: string;

  @Field(() => Int)
  level!: number;

  @Field(() => Int)
  sortOrder!: number;
}

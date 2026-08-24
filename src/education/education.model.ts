import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType('Education')
export class EducationModel {
  @Field(() => ID)
  id!: string;

  @Field()
  institution!: string;

  @Field()
  degree!: string;

  @Field({ nullable: true })
  field?: string;

  @Field(() => Int)
  startYear!: number;

  @Field(() => Int, { nullable: true })
  endYear?: number;

  @Field(() => Int)
  sortOrder!: number;
}

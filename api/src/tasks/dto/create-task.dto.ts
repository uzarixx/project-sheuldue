import {
  IsEmail, IsNumber,
  IsString,
  Length
} from "class-validator";

export class CreateTaskDto {

  @IsString({ message: "Is not a string" })
  @Length(4, 40, { message: "min length 4 and max 16" })
  readonly title: string;
  @IsString({ message: "Is not a string" })
  @Length(4, 40, { message: "min length 4 and max 16" })
  readonly description: string;
  @Length(4, 4000, { message: "min length 4 and max 4000" })
  readonly deadline: string | number;

  @IsNumber()
  readonly projectId: number;
}

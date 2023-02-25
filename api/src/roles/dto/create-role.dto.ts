import { IsString } from "class-validator";

export class CreateRoleDto {
  @IsString({ message: "Is not a string" })
  readonly value: string;
  @IsString({ message: "Is not a string" })
  readonly description: string;
}

import {
  IsEmail, IsNumber,
  IsString,
  Length
} from "class-validator";

export class DeleteProjectDto {
  @IsNumber()
  readonly projectId: string;
}

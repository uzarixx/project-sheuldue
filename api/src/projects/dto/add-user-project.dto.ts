import { IsNumber } from "class-validator";


export class AddUserProjectDto {
  @IsNumber()
  readonly projectId: number
  @IsNumber()
  readonly userId: number
}
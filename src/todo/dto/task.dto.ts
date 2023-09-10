import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateTaskMemoDto {
  @IsNumber()
  @IsNotEmpty()
  taskId: number;

  @IsString()
  @IsNotEmpty()
  memo: string;
}
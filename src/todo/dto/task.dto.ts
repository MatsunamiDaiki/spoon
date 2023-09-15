import { 
  ArrayMinSize, 
  IsArray, 
  IsEnum, 
  IsInt, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsString 
} from "class-validator";
import { TASK_STATUS } from "src/utils/enum";

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

export class UpdateTaskStatusDto {
  @IsEnum(TASK_STATUS, { message: 'Invalid task status' })
  @IsNotEmpty()
  status: number;
}

export class CreateTaskMemoDto {
  @IsNumber()
  @IsNotEmpty()
  taskId: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  memo: string[];
}

export class DeleteTaskMemoDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  taskMemoIds: number[];
}
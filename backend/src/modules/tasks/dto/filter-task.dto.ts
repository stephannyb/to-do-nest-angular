import { IsString, IsOptional, IsEnum, IsDateString, IsBooleanString } from 'class-validator';
import { TaskPriority, TaskCategory } from '../entities/task.entity';

export class FilterTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @IsEnum(TaskCategory)
  @IsOptional()
  category?: TaskCategory;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsBooleanString()
  @IsOptional()
  isCompleted?: boolean;
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }


  findAll(filterDto: FilterTaskDto): Promise<Task[]> {
    const { isCompleted, priority, category, dueDate, title } = filterDto;
    
    const whereClause: FindOptionsWhere<Task> = {};

    if (title) {
      whereClause.title = ILike(`%${title}%`);
    }
    if (isCompleted !== undefined) {
      whereClause.isCompleted = isCompleted;
    }
    if (priority) {
      whereClause.priority = priority;
    }
    if (category) {
      whereClause.category = category;
    }
    if (dueDate) {
      whereClause.dueDate = new Date(dueDate);
    }

    return this.taskRepository.find({
      where: whereClause,
      order: { dueDate: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task com ID ${id} não encontrada`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.preload({
      id: id,
      ...updateTaskDto,
    });

    if (!task) {
      throw new NotFoundException(`Task com ID ${id} não encontrada`);
    }

    return this.taskRepository.save(task);
  }

  async remove(id: string): Promise<void> { // id é string
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task com ID ${id} não encontrada`);
    }
  }
}
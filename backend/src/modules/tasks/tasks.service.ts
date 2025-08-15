import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, ILike } from 'typeorm';
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
    const findOptions: FindManyOptions<Task> = {
      where: {},
      order: { dueDate: 'ASC' },
    };

    if (title) {
      findOptions.where.title = ILike(`%${title}%`);
    }

    if (isCompleted !== undefined) {
      findOptions.where.isCompleted = isCompleted;
    }
    if (priority) {
      findOptions.where.priority = priority;
    }
    if (category) {
      findOptions.where.category = category;
    }
    if (dueDate) {
      findOptions.where.dueDate = dueDate;
    }

    return this.taskRepository.find(findOptions);
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
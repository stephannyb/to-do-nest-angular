import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { Task } from './entities/task.entity';


// Ex: http://localhost:3000/tasks
@Controller('tasks')
export class TasksController {
  // NestJS injeta o TasksService aqui para que possamos usá-lo.
  constructor(private readonly tasksService: TasksService) {}

  // Rota para CRIAR uma nova tarefa
  // POST /tasks
  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    // @Body() pega o corpo da requisição e o ValidationPipe (que configuramos no main.ts) o valida.
    return this.tasksService.create(createTaskDto);
  }

  // Rota para LISTAR todas as tarefas (com filtros)
  // GET /tasks?priority=high&isCompleted=false
  @Get()
  findAll(@Query() filterDto: FilterTaskDto): Promise<Task[]> {
    // @Query() pega os parâmetros da URL e o ValidationPipe os valida.
    return this.tasksService.findAll(filterDto);
  }

  // Rota para BUSCAR UMA tarefa pelo seu ID
  // GET /tasks/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    // @Param('id') pega o 'id' da URL.
    // O ParseUUIDPipe garante que o ID enviado é um UUID válido, senão retorna um erro 400.
    return this.tasksService.findOne(id);
  }

  // Rota para ATUALIZAR uma tarefa existente
  // PATCH /tasks/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  // Rota para DELETAR uma tarefa
  // DELETE /tasks/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.tasksService.remove(id);
  }
}
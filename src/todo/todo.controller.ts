import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TodoService } from './todo.service';
import { CreateTaskDto, CreateTaskMemoDto, DeleteTaskMemoDto, UpdateTaskStatusDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/task.dto';
import { Task, TaskMemo } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTasks(@Req() req: Request): Promise<Task[]> {
    return this.todoService.getTasks(req.user.id);
  }

  @Get(':id')
  getTaskById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<Task> {
    return this.todoService.getTaskById(req.user.id, taskId);
  }

  @Post()
  createTask(@Req() req: Request, @Body() dto: CreateTaskDto): Promise<Task> {
    return this.todoService.createTask(req.user.id, dto);
  }

  @Post('memo')
  async createTaskMemo(@Body() dto: CreateTaskMemoDto): Promise<TaskMemo[]> {
    const taskMemos = await this.todoService.createTaskMemo(dto);
    return taskMemos;
  }

  @Patch(':id')
  updateTaskById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    return this.todoService.updateTaskById(req.user.id, taskId, dto);
  }

  @Patch('status/:id')
  updateTaskStatus(
    @Req() req: Request,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.todoService.updateTaskStatus(req.user.id, taskId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTaskById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<void> {
    return this.todoService.deleteTaskById(req.user.id, taskId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('memo')
  deketeTaskMemo(@Body() dto: DeleteTaskMemoDto): Promise<void> {
    return this.todoService.deketeTaskMemo(dto);
  }
}

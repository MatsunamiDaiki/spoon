import { ForbiddenException, Injectable } from '@nestjs/common';
import { Task, TaskMemo } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto, CreateTaskMemoDto, DeleteTaskMemoDto, UpdateTaskDto, UpdateTaskStatusDto } from './dto/task.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  getTasks(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        TaskMemo: true, // TaskMemoとの結合を有効にする
      },
    })
  }

  getTaskById(userId: number, taskId: number): Promise<Task> {
    return this.prisma.task.findFirst({
      where: {
        userId,
        id: taskId
      }
    })
  }

  async createTask(userId: number, dto: CreateTaskDto): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        userId,
        ...dto
      }
    })
    return task;
  }

  async createTaskMemo(dto: CreateTaskMemoDto): Promise<TaskMemo[]> {
    const createdTaskMemos = await Promise.all(
      dto.memo.map(async (memo: string) => {
        const taskMemo = await this.prisma.taskMemo.create({
          data: {
            taskId: dto.taskId,
            memo,
          },
        });
        return taskMemo;
      })
    );
  
    return createdTaskMemos;
  }

  async updateTaskById(
    userId: number,
    taskId: number,
    dto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task || task.userId !== userId)
      throw new ForbiddenException('No permission to update');

    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...dto,
      },
    });
  }

  async updateTaskStatus(
    userId: number,
    taskId: number,
    dto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task || task.userId !== userId)
      throw new ForbiddenException('No permission to update');

      return this.prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          status: dto.status
        }
      })

  }

  async deleteTaskById(userId: number, taskId: number): Promise<void> {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task || task.userId !== userId)
      throw new ForbiddenException('No permission to delete');

    await this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }

  async deketeTaskMemo(dto: DeleteTaskMemoDto): Promise<void> {
    await this.prisma.taskMemo.deleteMany({
      where: {
        id: {
          in: dto.taskMemoIds,
        }
      }
    })
  }
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { DeleteResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User
    ): Promise<Task[]> {
    return this.tasksService.getAll(filterDto, user)
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
    ): Promise<Task> {
    return this.tasksService.getOne(id, user)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
      @Body() createTaskDto: CreateTaskDto,
      @GetUser() user: User
    ): Promise<Task> { 
    return this.tasksService.create(createTaskDto, user)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.update(id, status, user)
  } 

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
    ): Promise<DeleteResult> {
    return this.tasksService.delete(id, user)
  }

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getAllWithFilters(filterDto)
  //   } else {
  //     return this.tasksService.getAll() 
  //   }
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getOne(id)
  // }


  // /* @Post()
  // createTask(
  //     @Body('title') title: string,
  //     @Body('description')  description: string
  //   ): object {
  //     console.log('INSERTED : 1')
  //     console.log({title})
  //     console.log({description})
  //   return this.tasksService.create(title, description)
  // } */

  // // With Dto
  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(
  //     @Body() createTaskDto: CreateTaskDto
  //   ): object { 
  //   return this.tasksService.create(createTaskDto)
  // }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string ): object {
  //   return this.tasksService.delete(id)
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus
  // ): object {
  //   return this.tasksService.update(id, status)
  // } 

}

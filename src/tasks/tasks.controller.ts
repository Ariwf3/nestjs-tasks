import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getAll(filterDto)
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getOne(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
      @Body() createTaskDto: CreateTaskDto
    ): Promise<Task> { 
    return this.tasksService.create(createTaskDto)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Promise<Task> {
    return this.tasksService.update(id, status)
  } 

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number ): Promise<DeleteResult> {
    return this.tasksService.delete(id)
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

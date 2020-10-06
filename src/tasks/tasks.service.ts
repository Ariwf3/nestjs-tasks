import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
// import * as uniqid from 'uniqid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ){}

  async getAll(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getAll(filterDto)
    
  }

  async getOne(id: number): Promise<Task>{
    const taskFound = await this.taskRepository.findOne(id)

    if (!taskFound) {
       throw new NotFoundException(`Task with Id ${id} not found !`);
    }
    console.log({ found: 1, taskFound})

    return taskFound
  }
  
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto

    const task = new Task()
    task.title = title
    task.description = description
    task.status = TaskStatus.OPEN
    await task.save()

    return task;
  }

  async update(id: number, status: TaskStatus) {
    const taskFound = await this.getOne(id)

    taskFound.status = status

    await taskFound.save()

    console.log({ updated: 1, taskFound})

    return taskFound
  }

  async delete(id: number) : Promise<DeleteResult> {
    // const taskFound = await this.taskRepository.findOne(id)

    // if (!taskFound) {
    //    throw new NotFoundException(`Task with Id ${id} not found !`);
    // }

    // Avec methode delete de typeorm moins d'opérations
    
    // this.taskRepository.remove(taskFound)

    const taskFound = await this.taskRepository.delete(id)

    if (taskFound.affected === 0) {
      throw new NotFoundException(`Task with Id ${id} not found !`);
    }

    console.log({ deleted: taskFound.affected, })
    return taskFound
  }



  // private tasks: Task[] = [
  // ];

  // getAll(): Task[] {
  //   console.log(this.tasks)
  //   return this.tasks
  // }

  // getAllWithFilters(filterDto: GetTasksFilterDto) {
  //   const { status, search } = filterDto

  //   let tasks = this.getAll()

  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status)
  //   }

  //   if (search) {
  //     tasks = tasks.filter(
  //       task => task.title.includes(search) ||
  //       task.description.includes(search)
  //     )
  //   }

  //   return tasks
  // }

  // getOne(id: string): Task{
  //   // assingnation par decomposition
  //   const [_,taskFound]  = this.findOneTask(id)

  //   return taskFound
  // }

  // /* create(title: string, description: string): object {
  //   const task: Task = {
  //     id: uniqid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN
  //   }

  //   this.tasks.push(task)

  //   return { inserted: 1, element: task }
  // } */

  // // With Dto
  // create(createTaskDto: CreateTaskDto): object {

  //   // Assignation par décomposition (destructuring) pour récuperer title et description
  //   const { title, description } = createTaskDto

  //   const task: Task = {
  //     id: uniqid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN
  //   }

  //   this.tasks.push(task)

  //   console.log('INSERTED : 1')
  //   console.log('element', task)
    

  //   return { inserted: 1, element: task }
  // }

  // update(id: string, status: TaskStatus): object {
  //   // const indexToUpdate = this.tasks.findIndex( task => task.id === id )
  //   // const taskToUpdate = { ...this.tasks[indexToUpdate] } 

  //   // taskToUpdate.status = TaskStatus.IN_PROGRESS
  //   const task = this.getOne(id)

  //   task.status = status

  //   // this.tasks[indexToUpdate] = taskToUpdate

  //   console.log( { updated: 1, element: task } )
  //   return { updated: 1, element: task }

  // }

  // delete(id: string): object{
  //   const taskFound = this.getOne(id)

  //   // destructuring avec la deuxieme valeur ignorée
  //   const [indexToRemove,_] = this.findOneTask(id)

  //   const removed = this.tasks.splice(indexToRemove, 1)

  //   console.log({ deleted: 1, removed })
  //   return { deleted: 1, element: removed[0] }

  // }



  // // Helper
  // private findOneTask(id): [number, Task] { // Tuple

  //   const index = this.tasks.findIndex( task => task.id === id )
  //   const taskFound = this.tasks[index]

  //   if (!taskFound) {
  //     // Tips erreur utilisée a plusieurs niveaux car getOne appelé par les autres méthodes pas de répétition
  //     throw new NotFoundException(`Task with Id ${id} not found !`);
  //   }

  //   return [index, taskFound]

  // }
}

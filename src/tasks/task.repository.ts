import { EntityRepository, Repository } from "typeorm";
import { GetTasksFilterDto } from "./dto/get-tasks-filter-dto";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  
  async getAll(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto

    // With query builder
    const query = this.createQueryBuilder('task')
    

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` })
    }

    const tasks = query.getMany()

    return tasks
  }
}
import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Task } from "src/tasks/task.entity";



@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string 

  async validatePassword(plainPassword: string): Promise<boolean> {

    return bcrypt.compare(plainPassword, this.password)
  }

  @OneToMany(type => Task, task => task.user, { eager : true })
  tasks: Task[]

}
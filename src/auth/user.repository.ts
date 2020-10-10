import { EntityRepository, Repository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";


@EntityRepository(User)
export class UserRepository extends Repository<User>{

  private saltRounds = 10

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User>{
    const { username, password } = authCredentialsDto
    const user = new User()

    user.username = username
    user.password = await this.hashPassword(password, this.saltRounds)

    try {
      return await user.save()
    } catch (error) {
      console.log('[ERROR CODE]',error.code) // code = 'ER_DUP_ENTRY'
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException();
        
      }
    }
    
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto
    const user = await this.findOne({ username })  // findone param: id or objetc with searchCriteria

    if (user && await user.validatePassword(password)) {
      return user.username
    } else {
      return null
    }
  }

  private async hashPassword(password: string, saltRounds: number): Promise<string> {
    return bcrypt.hash(password, saltRounds)
  }
}  
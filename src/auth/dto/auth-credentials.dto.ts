import { IsString, Matches, MaxLength, MinLength } from "class-validator"

export class AuthCredentialsDto {

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  // Minimum 6 caractères 1 carac special 1 majus 1 minus
  // @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$ %^&*-]).{6,}$/, { message: 'password too weak (6 carac, 1 special, 1 lowercase, 1 uppercase'})
  password: string
}
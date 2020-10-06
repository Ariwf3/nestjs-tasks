
# Libs

class-validator et class-transformer

https://github.com/typestack/class-validator

```bash
npm install class-validator class-transformer --save
yarn add class-validator class-transformer
```

Ajoute des decorateurs de validation à placer au dessus des propriétés dans les dto ou classe

```js
// create-task-dto.ts
import { IsNotEmpty } from 'class-validator'

export class CreateTaskDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string
}
```

```js
// tasks.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
      @Body() createTaskDto: CreateTaskDto
    ): object { 
    return this.tasksService.create(createTaskDto)
  }
```

Exemple  d'un Pipe, il doit implémenter l'interface PipeTransform

```js
mport { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class TaskStatusValidationPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value)
    console.log('metadata', metadata)

    return value
  }

}
```
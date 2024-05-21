import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, userSchema } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ICreateUserUseCase,
  IDeleteUserUseCase,
  IFindAllUsersUseCase,
  IFindOneUserUseCase,
  IUpdateUserUseCase,
} from './interfaces';
import { ValidationException } from 'src/config/exceptions/errors/validation.exception';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: ICreateUserUseCase,
    private readonly findAllUser: IFindAllUsersUseCase,
    private readonly findOnUser: IFindOneUserUseCase,
    private readonly updateUser: IUpdateUserUseCase,
    private readonly deleteUser: IDeleteUserUseCase,
  ) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUser.execute(createUserDto);
  }

  @Get('list')
  findAll() {
    return this.findAllUser.execute();
  }

  @Get('view/:id')
  findOne(@Param('id') id: string) {
    return this.findOnUser.execute(Number(id));
  }

  /*  @Put('put/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUser.execute(String(updateUserDto.id));
  } */

  @Delete('del/:id')
  remove(@Param('id') id: string) {
    return this.deleteUser.execute(+id);
  }
}

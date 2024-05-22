import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
} from 'src/config/swagger/swagger.decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ICreateUserUseCase,
  IDeleteUserUseCase,
  IFindAllUsersUseCase,
  IFindOneUserUseCase,
  IUpdateUserUseCase,
} from './interfaces';
import { AuthGuard } from 'src/config/security/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly createUser: ICreateUserUseCase,
    private readonly findAllUser: IFindAllUsersUseCase,
    private readonly findOnUser: IFindOneUserUseCase,
    private readonly updateUser: IUpdateUserUseCase,
    private readonly deleteUser: IDeleteUserUseCase,
  ) {}
  @Post('create')
  @ApiCreatedResponse('Created')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.createUser.execute(createUserDto);
  }

  @ApiOkResponse('OK')
  @Get('list')
  async findAll() {
    return this.findAllUser.execute();
  }

  @ApiOkResponse('OK')
  @Get('get/:id')
  async findOne(@Param('id') id: string) {
    return this.findOnUser.execute(Number(id));
  }

  @ApiOkResponse('OK')
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    updateUserDto.id = Number(id);
    return this.updateUser.execute(updateUserDto);
  }

  @ApiOkResponse('OK')
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.deleteUser.execute(+id);
  }
}

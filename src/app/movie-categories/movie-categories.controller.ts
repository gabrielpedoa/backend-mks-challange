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
import { CreateMovieCategoryDto } from './dto/create-movie-category.dto';
import { UpdateMovieCategoryDto } from './dto/update-movie-category.dto';
import {
  ICreateMovieCategoryUseCase,
  IDeleteMovieCategoryUseCase,
  IFindAllMovieCategoryUseCase,
  IFindOneMovieCategoryUseCase,
  IUpdateMovieCategoryUseCase,
} from './interfaces';
import {
  ApiCreatedResponse,
  ApiOkResponse,
} from 'src/config/swagger/swagger.decorators';
import { AuthGuard } from 'src/config/security/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('movie-categories')
@ApiTags('Movie Categories')
@UseGuards(AuthGuard)
export class MovieCategoriesController {
  constructor(
    private readonly createMovieCategoryUseCase: ICreateMovieCategoryUseCase,
    private readonly findAllMovieCategoryUseCase: IFindAllMovieCategoryUseCase,
    private readonly findOneMovieCategoryUseCase: IFindOneMovieCategoryUseCase,
    private readonly updateMovieCategoryUseCase: IUpdateMovieCategoryUseCase,
    private readonly deleteMovieCategoryUseCase: IDeleteMovieCategoryUseCase,
  ) {}

  @Post('create')
  @ApiCreatedResponse('Created')
  async create(@Body() createMovieCategoryDto: CreateMovieCategoryDto) {
    return await this.createMovieCategoryUseCase.execute(
      createMovieCategoryDto,
    );
  }

  @Get('list')
  @ApiOkResponse('OK')
  async findAll() {
    return await this.findAllMovieCategoryUseCase.execute();
  }

  @Get('get/:categoryName')
  @ApiOkResponse('OK')
  async findOne(@Param('categoryName') categoryName: string) {
    return await this.findOneMovieCategoryUseCase.execute(categoryName);
  }

  @Put('update/:id')
  @ApiOkResponse('OK')
  async update(
    @Param('id') id: string,
    @Body() updateMovieCategoryDto: UpdateMovieCategoryDto,
  ) {
    updateMovieCategoryDto.id = Number(id);
    return this.updateMovieCategoryUseCase.execute(updateMovieCategoryDto);
  }

  @Delete('delete/:id')
  @ApiOkResponse('OK')
  async remove(@Param('id') id: string) {
    return await this.deleteMovieCategoryUseCase.execute(Number(id));
  }
}

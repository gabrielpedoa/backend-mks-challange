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
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/config/security/auth.guard';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  ICreateMovieUseCase,
  IDeleteMovieUseCase,
  IFindAllMovieUseCase,
  IFindOneMovieUseCase,
  IUpdateMovieUseCase,
} from './interfaces';

@Controller('movies')
@ApiTags('Movies')
@UseGuards(AuthGuard)
export class MoviesController {
  constructor(
    private readonly createMovieUseCase: ICreateMovieUseCase,
    private readonly findAllMovieUseCase: IFindAllMovieUseCase,
    private readonly findOneMovieUseCase: IFindOneMovieUseCase,
    private readonly updateMovieUseCase: IUpdateMovieUseCase,
    private readonly deleteMovieUseCase: IDeleteMovieUseCase,
  ) {}

  @Post('create')
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.createMovieUseCase.execute(createMovieDto);
  }

  @Get('list')
  async findAll() {
    return await this.findAllMovieUseCase.execute();
  }

  @Get('get/:title')
  async findOne(@Param('title') title: string) {
    return await this.findOneMovieUseCase.execute(title);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    updateMovieDto.id = Number(id);
    return await this.updateMovieUseCase.execute(updateMovieDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.deleteMovieUseCase.execute(+id);
  }
}

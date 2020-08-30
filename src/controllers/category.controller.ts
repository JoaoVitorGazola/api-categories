import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { CategoriesService } from '../services/category.service';
import { Category } from '../entities/category.entity';

@Controller('categories')
export class CategoriesController {
    i = 0;
  constructor(private readonly categorieService: CategoriesService) {

      this.categorieService.starter();
  }

  @Get()
  getAll(): Promise<Category[]> {
    return this.categorieService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Category> {
    return this.categorieService.findOne(id);
  }

  @Post()
  async create(@Body() body: Category): Promise<Category[]>{
    return this.categorieService.create(body);
  }

}

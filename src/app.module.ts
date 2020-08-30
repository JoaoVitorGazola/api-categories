import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity'
import { CategoriesModule } from './modules/category.module'

@Module({
  imports: [TypeOrmModule.forRoot({
    name:'default',
    type: 'sqlite',
    database: "./db.sqlite3",
    entities: [Category],
    synchronize: true,
  }),
  CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
 }

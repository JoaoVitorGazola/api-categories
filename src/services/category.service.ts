import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { Connection } from 'typeorm';

@Injectable()
export class CategoriesService {
    queryRunner = this.connection.createQueryRunner();
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
        private connection: Connection
    ) {
        this.queryRunner.connect();
    }

    async starter(): Promise<Category[]> {
        await this.queryRunner.startTransaction();
        try {
            var i = 1;
            while(i <= 10) {
                this.queryRunner.manager.save(this.categoriesRepository.create({name: "Category " + i}));
                i++;
            }

            await this.queryRunner.commitTransaction();
        } catch (err) {
            await this.queryRunner.rollbackTransaction();
        } finally {
            await this.queryRunner.release();
            return this.categoriesRepository.find();
        }
    }

    async create(category: Category): Promise<Category[]> {
        await this.queryRunner.startTransaction();
        try {
            await this.queryRunner.manager.save(await this.categoriesRepository.create(category));

            await this.queryRunner.commitTransaction();
        } catch (err) {
            await this.queryRunner.rollbackTransaction();
        } finally {
            await this.queryRunner.release();
            return this.categoriesRepository.find();
        }
    }

    findAll(): Promise<Category[]> {
        return this.categoriesRepository.find();
    }

    findOne(id: string): Promise<Category> {
        return this.categoriesRepository.findOne(id);
    }
}
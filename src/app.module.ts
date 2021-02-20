import { HttpExceptionFilter } from './http-exception.filter';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as joi from '@hapi/joi';
import { APP_FILTER } from '@nestjs/core';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: joi.object({
          POSTGRES_HOST: joi.string().required(),
          POSTGRES_PORT: joi.number().required(),
          POSTGRES_USER: joi.string().required(),
          POSTGRES_PASSWORD: joi.string().required(),
          POSTGRES_DB: joi.string().required(),
          PORT: joi.number(),
          JWT_SECRET: joi.string().required(),
          JWT_EXPIRATION_TIME: joi.string().required()
      })
    }),
    UsersModule,
    AuthModule,
    CategoriesModule,
    SubcategoriesModule,
    ProductsModule,  
  ],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: HttpExceptionFilter
  }],
})
export class AppModule {}

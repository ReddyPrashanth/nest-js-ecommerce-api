import { OptionRepository } from './option.repository';
import { OptionsetRepository } from './optionset.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductoptionsController } from './productoptions.controller';
import { ProductoptionsService } from './productoptions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OptionsetRepository, OptionRepository])
  ],
  controllers: [ProductoptionsController],
  providers: [ProductoptionsService]
})
export class ProductoptionsModule {}

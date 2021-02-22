import { CreateProductoptionsDto } from './dto/create-productoptions.dto';
import { CreateOptionsDto } from './dto/create-options.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { CreateOptionsetsDto } from './dto/create-optionsets.dto';
import { ProductoptionsService } from './productoptions.service';
import { Body, Controller, Get, Param, Post, UseGuards, ParseIntPipe, Delete, HttpCode } from '@nestjs/common';

@Controller('productoptions')
@UseGuards(JwtAuthGuard)
export class ProductoptionsController {
    constructor(
        private readonly productoptionsService: ProductoptionsService
    ) {}
    
    @Post('')
    async createproductOptions(@Body() productoptions: CreateProductoptionsDto) {
        return await this.productoptionsService.createproductoptions(productoptions.productoptions);
    }

    @Post('/optionsets')
    async createOptionsets(@Body() createOptionsetsDto: CreateOptionsetsDto) {
        return await this.productoptionsService.createOptionsets(createOptionsetsDto);
    }

    @Get('/optionset/:id')
    async getOptionsetById(@Param('id', ParseIntPipe) id: number) {
        return await this.productoptionsService.getOptionsetById(id);
    }

    @Post('optionset/:id/options')
    async createOptions(@Param('id', ParseIntPipe) id: number, @Body() createOptionsDto: CreateOptionsDto) {
        return await this.productoptionsService.createOptions(id, createOptionsDto.options);
    }

    @Delete('/optionset/:id')
    @HttpCode(204)
    async deleteOptionset(@Param('id', ParseIntPipe) id: number) {
        await this.productoptionsService.deleteOptionset(id);
    }
}

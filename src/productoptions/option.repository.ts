import { HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Option } from './option.entity';
import { EntityRepository, Repository } from "typeorm";
import { CreateOptionDto } from './dto/create-option.dto';
import { PostgresErrorCode } from '../database/postgres-error-code.enum';
import { getUniqueViolationKey } from '../app.helper';

@EntityRepository(Option)
export class OptionRepository extends Repository<Option> {
    async createOptions(optionsetId: number, createOptions: CreateOptionDto[]): Promise<Option[]> {
        const options = this.create(createOptions)
                            .map(option => {
                                option.optionsetId = optionsetId;
                                return option;
                            });
        try{
            await this.save(options);
            return options;
        }catch(error){
            if(error?.code === PostgresErrorCode.UniqueViolation){
                const value = getUniqueViolationKey(error?.detail);
                throw new BadRequestException(`Option ${value} is taken.`);
            }
            throw new HttpException('Something went wrong.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
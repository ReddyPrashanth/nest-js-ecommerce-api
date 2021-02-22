import { HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { CreateOptionsetsDto } from './dto/create-optionsets.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Optionset } from './optionset.entity';
import { CreateOptionsetDto } from './dto/create-optionset.dto';
import { PostgresErrorCode } from '../database/postgres-error-code.enum';
import { getUniqueViolationKey } from '../app.helper';

@EntityRepository(Optionset)
export class OptionsetRepository extends Repository<Optionset> {
    async createOptionsets(createoptionsets: CreateOptionsetDto[]): Promise<Optionset[]> {
        return await this.createOptionsetsFromDto(createoptionsets);
    }

    async createOptionset(optionsetDto: CreateOptionsetDto): Promise<Optionset> {
        return await this.createOptionsetsFromDto([optionsetDto])[0];
    }

    private async createOptionsetsFromDto(createoptionsets: CreateOptionsetDto[]): Promise<Optionset[]> {
        const optionsets = this.create(createoptionsets);
        try{
            await this.save(optionsets);
            return optionsets;
        }catch(error){
            console.log(error);
            if(error?.code === PostgresErrorCode.UniqueViolation){
                const value = getUniqueViolationKey(error?.detail as string);
                throw new BadRequestException(`Product ${value} is taken.`);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
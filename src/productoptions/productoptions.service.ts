import { CreateOptionDto } from './dto/create-option.dto';
import { CreateProductoptionDto } from './dto/create-productoption.dto';
import { OptionRepository } from './option.repository';
import { OptionsetNotFoundException } from './exceptions/optionset-not-found.exception';
import { CreateOptionsetsDto } from './dto/create-optionsets.dto';
import { OptionsetRepository } from './optionset.repository';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Optionset } from './optionset.entity';
import { Option } from './option.entity';
import { EntityManager, getManager } from 'typeorm';
import { PostgresErrorCode } from '../database/postgres-error-code.enum';
import { getUniqueViolationKey } from '../app.helper';

@Injectable()
export class ProductoptionsService {
    constructor(
        @InjectRepository(OptionsetRepository)
        private readonly optionsetRepository: OptionsetRepository,
        @InjectRepository(OptionRepository)
        private readonly optionRepository: OptionRepository
    ) {}

    async createOptionsets(createOptionsetsDto: CreateOptionsetsDto): Promise<Optionset[]> {
        return await this.optionsetRepository.createOptionsets(createOptionsetsDto.optionsets);
    }

    async getOptionsetById(id: number): Promise<Optionset> {
        const optionset = await this.optionsetRepository.findOne(id);
        if(optionset){
            return optionset;
        }
        throw new OptionsetNotFoundException(id);
    }

    async createOptions(id: number, createOptions: CreateOptionDto[]): Promise<Option[]> {
        const optionset = await this.getOptionsetById(id);
        return await this.optionRepository.createOptions(optionset.id, createOptions);
    }

    async createproductoptions(productoptions: CreateProductoptionDto[]): Promise<{optionsetIds: number[]}> {
        const optionsetIds: number[] = [];
        await getManager().transaction(async (entityManager: EntityManager) => {
            try{
                for(let i=0; i< productoptions.length; i++) {
                    let optionset = productoptions[i].optionset;
                    const options = productoptions[i].options;
                    optionset = await entityManager.save(Optionset, optionset);
                    const actualoptions = options.map(option => {
                        return {
                            ...option,
                            optionsetId: optionset.id
                        }
                    });
                    await entityManager.save(Option, actualoptions);
                    optionsetIds.push(optionset.id);
                }
            }catch(error){
                if(error?.code === PostgresErrorCode.UniqueViolation){
                    const value = getUniqueViolationKey(error?.detail);
                    throw new BadRequestException(`${error?.table} ${value} is taken.`);
                }
                throw new InternalServerErrorException('Something went wrong.');
            }
        });
        return {
            optionsetIds
        };
    }

    async deleteOptionset(id: number) {
        const deleted = await this.optionsetRepository.delete({id});
        if(deleted.affected === 0){
            throw new OptionsetNotFoundException(id);
        }
    }
}

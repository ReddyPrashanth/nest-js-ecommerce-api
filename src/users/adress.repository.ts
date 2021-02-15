import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './address.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {

    async saveAddress(createAddressDto: CreateAddressDto, userId: number): Promise<Address> {
        const address = this.create(createAddressDto);
        address.userId = userId;
        try{
            await address.save();
            return address;
        }catch(error) {
            console.log(error);
            throw new HttpException('Something went wrong.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
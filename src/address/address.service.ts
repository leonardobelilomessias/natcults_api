import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityService } from '../city/city.service';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { AddressEntity } from './address.entity';
import { CreateAddressDto } from './dtos/createAddress.dto';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository:Repository<AddressEntity>,
        private readonly userService:UserService,
        private readonly cityService:CityService
    ){}

    async createAddress(createAddressDto:CreateAddressDto,userId:number):Promise<AddressEntity>{
        await this.cityService.findCityById(createAddressDto.cityId)
        await this.userService.findUserById(userId)
        return this.addressRepository.save({...createAddressDto,userId})
    }
}

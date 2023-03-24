import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { AddressEntity } from './address.entity';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { ReturnAddressDto } from './dtos/ReturnAddress.dto';

@Controller('address')
export class AddressController {
    constructor(
        private readonly addressService:AddressService
    ){}

    @Roles(UserType.User)
    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(
    @Body ()createAddresDto:CreateAddressDto,
    @UserId()userId:number):Promise<AddressEntity>{
        console.log(userId)
        return this.addressService.createAddress(createAddresDto,userId)
    }

    @Get()
    async findAddressByUserId(
      @UserId() userId: number,
    ): Promise<ReturnAddressDto[]> {
      return (await this.addressService.findAddressByUserId(userId)).map(
        (address) => new ReturnAddressDto(address),
      );
    }
}

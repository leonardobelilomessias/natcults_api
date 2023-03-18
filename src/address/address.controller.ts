import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { AddressEntity } from './address.entity';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';

@Controller('address')
export class AddressController {
    constructor(
        private readonly addressService:AddressService
    ){}
    @Roles(UserType.User)
    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(@Body ()createAddresDto:CreateAddressDto,@UserId()userId:number):Promise<AddressEntity>{
        console.log(userId)
        return this.addressService.createAddress(createAddresDto,userId)
    }
}

import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
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
    @Post('/:userId')
    @UsePipes(ValidationPipe)
    async createAddress(@Body ()createAddresDto:CreateAddressDto,@Param('userId')userId:number):Promise<AddressEntity>{
        return this.addressService.createAddress(createAddresDto,userId)
    }
}

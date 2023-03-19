import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityModule } from '../city/city.module';
import { CityService } from '../city/city.service';
import { UserModule } from '../user/user.module';
import { AddressController } from './address.controller';
import { AddressEntity } from './address.entity';
import { AddressService } from './address.service';

@Module({
  imports:[TypeOrmModule.forFeature([AddressEntity]),UserModule,CityModule],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
 
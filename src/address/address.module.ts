import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityModule } from 'src/city/city.module';
import { CityService } from 'src/city/city.service';
import { UserModule } from 'src/user/user.module';
import { AddressController } from './address.controller';
import { AddressEntity } from './address.entity';
import { AddressService } from './address.service';

@Module({
  imports:[TypeOrmModule.forFeature([AddressEntity]),UserModule,CityModule],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
 
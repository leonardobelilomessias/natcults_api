import { CacheModule, Module , } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';

@Module({
    imports:[TypeOrmModule.forFeature([CityEntity]),CacheModule.register({ttl:9000000000})],
  controllers: [CityController],
  providers: [CityService]
})
export class CityModule {}

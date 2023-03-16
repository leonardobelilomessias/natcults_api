import { Injectable , CacheModule, CACHE_MANAGER, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { CacheService } from 'src/cache/cache.service';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
        
        private readonly chacheService:CacheService
    
      ) {}
    async getAllCytiesByStateId(stateId:number):Promise<CityEntity[]>{
        return this.chacheService.getCache<CityEntity[]>(`state_${stateId}`,()=>   this.cityRepository.find({
            where:{stateId}
        }))

    }
}

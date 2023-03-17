import { Injectable , CacheModule, CACHE_MANAGER, Inject, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { NotFoundError } from 'rxjs';
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
    async findCityById(cityId:number):Promise<CityEntity>{
        const city = await this.cityRepository.findOne({
            where:{
                id:cityId
            }
        })
        if(!city){
            throw new NotFoundException(`City id ${cityId} not found `)
        }
        return city
    }
}

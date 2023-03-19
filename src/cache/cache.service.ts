import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CityEntity } from '../city/entities/city.entity';

@Injectable()
export class CacheService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    
      ) {}
    async getCache<T>(key:string,functionRequest:()=>Promise<T>):Promise<T>{
        const aldata:T = await this.cacheManager.get(key);
        if(aldata){
            return aldata
        }
        const cities:T = await functionRequest()
        await this.cacheManager.set(key, cities);

        return cities
    }
}

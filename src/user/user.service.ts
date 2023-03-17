import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const saltOrRounds = 10;
        const newPasswordHash = await hash(createUserDto.password, saltOrRounds);
        return this.userRepository.save({ ...createUserDto, password: newPasswordHash, typeUser: 1, })


    }

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find()
    }
    async findUserById(userId:number):Promise<UserEntity>{
        const user = await this.userRepository.findOne({where:{id:userId}})
        if(!user){
            throw new NotFoundException('user id not found')
        }
        return user
    }
}

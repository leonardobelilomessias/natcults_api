import { Injectable, NotFoundException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { ReturUserDto } from '../user/dtos/returnUser.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnLogin } from './dtos/returnLogin.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService:UserService,
        private jwtService: JwtService
        ){
        
    }
    async login(loginDto:LoginDto):Promise<ReturnLogin>{
        const user:UserEntity | undefined = await  this.userService.findUserByemail(loginDto.email).catch(()=>undefined)
        
        const isMatch = await compare(loginDto.password, user?.password||" ");
        if(user){
            
        }

        if(!user || !isMatch){
            throw new NotFoundException(`Email or password invalid`)
        }
        return {
            accessToken:this.jwtService.sign({...new LoginPayload(user)}),
            user:new ReturUserDto(user)
        }
    }
}

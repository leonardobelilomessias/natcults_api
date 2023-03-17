import { ReturUserDto } from "src/user/dtos/returnUser.dto";


export interface ReturnLogin{
    user:ReturUserDto
    accessToken:string
}
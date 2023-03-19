import { ReturUserDto } from "../../user/dtos/returnUser.dto";


export interface ReturnLogin{
    user:ReturUserDto
    accessToken:string
}
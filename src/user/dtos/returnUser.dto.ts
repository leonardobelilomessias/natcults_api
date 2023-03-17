import { ReturnAddressDto } from "src/address/dtos/ReturnAddress.dto"
import { UserEntity } from "../entities/user.entity"

export class ReturUserDto{
    
    name:string
    email:string
    phone:string
    cpf:string
    addresses?:ReturnAddressDto[]


    constructor(userEntity:UserEntity){
        this.name = userEntity.name
        this.email = userEntity.email
        this.phone = userEntity.phone
        this.cpf = userEntity.cpf
        this.addresses = userEntity.addresses ? userEntity.addresses.map((address)=> new ReturnAddressDto(address)):undefined
    }
}
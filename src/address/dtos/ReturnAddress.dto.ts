import { isInt, IsInt, IsOptional, IsString } from "class-validator";
import { AddressEntity } from "../address.entity";

export  class ReturnAddressDto{
    complement:string
    numberAddress:number
    cep:string
    city:any

    constructor(address:AddressEntity){
        this.complement = address.complement
        this.cep = address.cep
        this.numberAddress = address.numberAddress
    }
}
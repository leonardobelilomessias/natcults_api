import { AddressEntity } from "../../address/address.entity"
import { CityEntity } from "../../city/entities/city.entity"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


@Entity('state')
export class StateEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({name:"name", nullable:true})
    name:string
    
    @CreateDateColumn({name:'created_at'})
    createdAt:Date

    @UpdateDateColumn({name:'updated_at'})
    updateAt:Date

    @OneToMany(()=>CityEntity,(city)=> city.state)
    cities?: CityEntity[]

}
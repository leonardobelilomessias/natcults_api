import { AddressEntity } from "src/address/address.entity"
import { StateEntity } from "src/state/entitites/state.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


@Entity('city')
export class CityEntity{
    @PrimaryGeneratedColumn('rowid')
    id:number

    @Column({name:"name", nullable:true})
    name:string
    
    @Column({name:"state_id", nullable:false})
    stateId:number

    @CreateDateColumn({name:'created_at'})
    createdAt:Date

    @UpdateDateColumn({name:'updated_at'})
    updateAt:Date

    @OneToMany(()=>AddressEntity,(address)=> address.city)
    addresses?: AddressEntity[]

    @ManyToOne(() => StateEntity, (state) => state.cities)
    @JoinColumn({name:'state_id', referencedColumnName:'id'})
    state?: StateEntity
}
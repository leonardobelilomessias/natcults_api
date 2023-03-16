import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


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
}
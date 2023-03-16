import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


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
}
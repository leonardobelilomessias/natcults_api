import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

 export const userEntityMock :UserEntity={
    cpf:'123',
    createdAt:new Date(),
    email:'teste@email.com',
    id:2566,
    name:'nameMock',
    password:"largepassword",
    phone:'12554',
    typeUser:UserType.User,
    updateAt: new Date()
 }
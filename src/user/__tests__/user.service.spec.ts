import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';
import { UserService } from '../user.service';
import { createUserMock } from '../__mocks__/createUser.mock';
import { userEntityMock } from '../__mocks__/user.mock';

describe('UserService', () => {

  let service: UserService;
  let userRepository:Repository<UserEntity>
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,{
        provide:getRepositoryToken(UserEntity),
        useValue:{
          findOne:jest.fn().mockResolvedValue(userEntityMock),
          save:jest.fn().mockResolvedValue(userEntityMock),
          
        }
      }],
      
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>( getRepositoryToken(UserEntity))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined()
  });

  it('should return user in findUser By email', async () => {
    const user = await  service
    .findUserByemail(userEntityMock.email)
    expect(user).toEqual(userEntityMock)
  });


  it('should return error findUser By email', async () => {
    jest.spyOn(userRepository,'findOne').mockResolvedValue(undefined)

    expect(service.findUserByemail(userEntityMock.email)).rejects.toThrowError()
  });
  it('should return error findUser By id', async () => {
    jest.spyOn(userRepository,'findOne').mockResolvedValue(undefined)

    expect(service.findUserById(userEntityMock.id)).rejects.toThrowError()
  });

  it('should return user in findUser By relations', async () => {
    const user = await  service
    .getUserByIdUsingRelations(userEntityMock.id)
    expect(user).toEqual(userEntityMock)
  });

  it('should return error in findUserByEmail (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(
      service.findUserByemail(userEntityMock.email),
    ).rejects.toThrowError();
  });

  it('should return error in findUserById (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(service.findUserById(userEntityMock.id)).rejects.toThrowError();
  });
  it('should return error if user exist', async () => {
    expect(service.createUser(createUserMock)).rejects.toThrowError();
  });
  it('should return user if user not exist', async () => {
    const spy = jest.spyOn(userRepository, 'save');
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const user = await service.createUser(createUserMock);

    expect(user).toEqual(userEntityMock);
    expect(spy.mock.calls[0][0].typeUser).toEqual(UserType.User);
  });
});

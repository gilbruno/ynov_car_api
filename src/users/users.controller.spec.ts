import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>
  let fakeAuthService: Partial<AuthService>

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({id, email: 'a@a.com', password: '123'} as User)
      },
      find: (email: string) => {
        return Promise.resolve([{id: 1, email: 'a@a.com', password: '123'} as User])
      },
      remove: (id: number) => {
        return Promise.resolve('')
      },
      update: (id: number, attr: Partial<User>) => {
        return Promise.resolve({id: 1, email: '', password: ''} as User)
      }
    }
    fakeAuthService  = {
      signup: (email: string, password: string) => {
        return Promise.resolve({id: 1, email, password} as User)
      },
      signin: (email: string, password: string) => {
        return Promise.resolve({id: 1, email, password} as User)
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile()

    controller = module.get<UsersController>(UsersController);
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  })
})

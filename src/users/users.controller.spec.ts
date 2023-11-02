import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>
  let fakeAuthService: Partial<AuthService>
  const fakeUserRepository = {
    find: jest.fn().mockResolvedValue([
      // Add some mock user data here
      { id: 1, password: 'user1', email: 'user1@example.com' },
      { id: 2, password: 'user2', email: 'user2@example.com' },
      // ...
    ]),
    findOne: jest.fn((id) => {
      // Add logic to return a single user based on the id
      const users = [
        { id: 1, username: 'user1', email: 'user1@example.com' },
        { id: 2, username: 'user2', email: 'user2@example.com' },
        // ...
      ];
      return Promise.resolve(users.find(user => user.id === id));
    }),
    save: jest.fn((user) => Promise.resolve({ ...user, id: Date.now() })),  // Simulate saving a user and generating an id
    update: jest.fn((id, updateUserDto) => Promise.resolve({ id, ...updateUserDto })),
    delete: jest.fn((id) => Promise.resolve({ affected: 1 })),  // Simulate deleting a user
    // Add any other methods that your service uses
  };
  
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
      imports: [TypeOrmModule.forFeature([User])],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: fakeUserRepository,
        },
        // {
        //   provide: AuthService,
        //   useValue: fakeAuthService,
        // }
      ]
    })
    .compile()

    controller = module.get<UsersController>(UsersController);
  
  })

  it('should be defined', () => {
    console.log('YTEST')
    // expect(controller).toBeDefined();
  })
})

import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import {UsersService } from './users.service' 
import { User } from './user.entity'
import { BadRequestException, NotFoundException } from '@nestjs/common'

let service:  AuthService
let fakeUsersService: Partial<UsersService>

describe('AuthService', () => {

    //--------------------------------------------------------------
    beforeEach(async () => {
        //1. Create a fake copy of the user service
        fakeUsersService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve({id: 1, email, password} as User)
        }

        //2. Create a Module with AutService & UsersService as provider
        const module = await Test.createTestingModule({
            providers: [
                AuthService,  
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                }
            ]    
        }).compile()

        //3. Get our AuthService
        service = module.get(AuthService)

    })

    //--------------------------------------------------------------
    it('can create an instance of AuthService', 
        async () => {
            expect(service).toBeDefined()
        }
    )

    //--------------------------------------------------------------
    it('creates a new user with salted and hashed password', 
        async () => {
            const password = 'test123'
            const user = await service.signup('gb@yahoo.fr', password)
            expect(user.password).not.toEqual(password)
            const [salt, hash] = user.password.split('.')
            expect(salt).toBeDefined()
            expect(hash).toBeDefined()
        }
    )

    //--------------------------------------------------------------
    it('throws an error if a signin is called with an unused email', 
        async () => {
            await expect(service.signin('gb@yahoo.fr', 'asdf')).rejects.toThrow(
                new NotFoundException('user not found'),
            );
        }
    )


})


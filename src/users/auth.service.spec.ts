import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import {UsersService } from './users.service' 
import { User } from './user.entity'

let service:  AuthService

describe('AuthService', () => {

    //--------------------------------------------------------------
    beforeEach(async () => {
        //1. Create a fake copy of the user service
        const fakeUsersService: Partial<UsersService> = {
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

})


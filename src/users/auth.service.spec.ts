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
        const users: User[] = []
        //1. Create a fake copy of the user service
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter(
                    user => {
                        return user.email === email
                    }
                )
                return Promise.resolve(
                    filteredUsers
                )
            },
            create: (email: string, password: string) => {
                const user = {
                    id: Math.floor(Math.random() * 999999), 
                    email, 
                    password
                } as User
                users.push(user)
                return Promise.resolve(user)
            }
                
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
//     it('throws an error if a user signs up with email that is in use ', 
//        async () => {
//            fakeUsersService.find = () => 
//                Promise.resolve([
//                    {
//                        id: 1,
//                        email : 'gb@yahoo.fr',
//                        password: 'test_gb'
//                    } as User
//                ])

//            await expect(service.signup('gb@yahoo.fr', 'asdf')).rejects.toThrow(
//                new BadRequestException('email in use'),
//            )
//        }
//    )

    //--------------------------------------------------------------
    it('throws an error if a user signs up with email that is in use ', 
        async () => {
            await service.signup('gb@yahoo.fr', 'asdf')
            await expect(service.signup('gb@yahoo.fr', 'toto')).rejects.toThrow(
                new BadRequestException('email in use'),
            )
        }
   )

    //--------------------------------------------------------------
    it('throws an error if a signin is called with an unused email', 
        async () => {
            await expect(service.signin('gb@yahoo.fr', 'asdf')).rejects.toThrow(
                new NotFoundException('user not found'),
            )
        }
    )

    //--------------------------------------------------------------
    // it('throws an error if a password is incorrect during signin', 
    //     async () => {
    //         fakeUsersService.find = () => 
    //         Promise.resolve([
    //             {
    //                 id: 1,
    //                 email : 'gb@yahoo.fr',
    //                 password: 'test_gb'
    //             } as User
    //         ])

    //         await expect(service.signin('gb@yahoo.fr', 'asdf')).rejects.toThrow(
    //             new BadRequestException('Bad user/password combination'),
    //         )
    //     }
    // )

    //--------------------------------------------------------------
    it('throws an error if a password is incorrect during signin', 
        async () => {
            await service.signup('gb@yahoo.fr', 'test123')
            await expect(service.signin('gb@yahoo.fr', 'test124')).rejects.toThrow(
                new BadRequestException('Bad user/password combination'),
            )
        }
    )

    //--------------------------------------------------------------
    // it('returns a user if a correct password is provided during signin', 
    //     async () => {
    //         fakeUsersService.find = () => 
    //         Promise.resolve([
    //             {
    //                 id: 1,
    //                 email : 'gb@yahoo.fr',
    //                 password: 'fd16272a056aa337.6ac3452c6beb6ee916c4dfb70a825ffa020fc8f1c2711b0e54041ca8649265d1'
    //             } as User
    //         ])

    //         const user = await service.signin('gb@yahoo.fr', 'password')
    //         expect(user).toBeDefined()
    //     }
    // )

    //--------------------------------------------------------------
    it('returns a user if a correct password is provided during signin', 
        async () => {
            await service.signup('gb@yahoo.fr', 'password')
            const user = await service.signin('gb@yahoo.fr', 'password')
            expect(user).toBeDefined()
        }
    )

})


import { 
    Body, 
    Controller, 
    Get, Param, Post, Patch, Query, Delete, 
    NotFoundException
} 
    from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize, SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(private usersService: UsersService) {

    }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this.usersService.create(body.email, body.password)
    }

    @Get('/:id')
    findById(@Param('id') id: number) {
        console.log("HANDLER findById !")
        const user = this.usersService.findOne(id)
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }
    

    @Get()
    findUserByEmail(@Query('email') email: string) {
        const user = this.usersService.find(email)
        return user
    }

    @Get()
    findAll(@Query('all') all:boolean) {
        const user = this.usersService.findAll()
        return user
    }


    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id))
    }

    @Patch('/:id')
    updateUser(
        @Param('id') id: string,
        @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body)
    }

}

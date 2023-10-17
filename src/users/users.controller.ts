import { 
    Body, 
    Controller, 
    Get, Param, Post, Patch, Query, Delete, 
    NotFoundException, Session
} 
    from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize, SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.authService.signup(body.email,body.password)
    }

    @Post('/signin')
    signin(@Body() body: CreateUserDto) {
        return this.authService.signin(body.email,body.password)
    }

    @Get('/colors/:color')
    setColor(@Param('color') color: string, @Session() session: any) {
        session.color = color
    }

    @Get('/colors')
    getColor(@Session() session: any) {
        return session.color
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

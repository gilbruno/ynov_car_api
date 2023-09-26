import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>) {

    }

    create(email: string, password: string) {
        const user = this.repo.create({email, password})
        return this.repo.save(user)
    }

    findOne(id: number) {
        const user = this.repo.findOneBy({id})
        return user
    }

    find(email: string) {
        const user = this.repo.findOneBy({email})
        return user
    }

    update(id: number, attr: Partial<User>) {

    }

    remove() {

    }    
}

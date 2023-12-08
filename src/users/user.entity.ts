import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    AfterInsert, 
    OneToMany } 
from "typeorm";
import { Report } from "../reports/report.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column({ default: true })
    admin: boolean

    @OneToMany(() => Report, (report: Report) => report.user)
    reports: Report[]

    @AfterInsert()
    logInsert() {
        console.log('User created with id ' + this.id)
    }

}

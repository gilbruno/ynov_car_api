import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    price: number

    /**
     * Company that make the vehicle
     */
    @Column()
    make: string

    @Column()
    model: string

    @Column()
    year: number

    /**
     * Longitude where the vehicle is sold
     */
    @Column()
    lng: number

    /**
     * Latitude where the vehicle is sold
     */
    @Column()
    lat: number
    
    @Column()
    mileage: number

}
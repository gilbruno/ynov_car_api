import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator"
import { Transform } from "class-transformer"

export class GetEstimateDto {

    @IsString()
    make: string

    @IsString()
    model: string

    @IsNumber()
    @Min(2000)
    @Max(2023)
    @Transform(({value})=> parseInt(value))
    year: number

    @IsNumber()
    @Min(0)
    @Max(500000)
    @Transform(({value})=> parseInt(value))
    mileage: number

    @IsLongitude()
    @Transform(({value})=> parseFloat(value))
    lng: number

    @IsLatitude()
    @Transform(({value})=> parseFloat(value))
    lat: number
}

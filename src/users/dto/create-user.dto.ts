import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "@nestjs/class-validator";
import { UserRole } from "../intefaces/interfaces";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    readonly name: string

    @IsEmail()
    readonly email: string

    @IsString()
    readonly password:string

    @IsOptional()
    @IsString()
    readonly phoneNumber: string

    @IsString()
    readonly rol: UserRole
}

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserRole } from "../intefaces/interfaces";


@Schema( { timestamps:true, versionKey:false } )
export class User extends Document {

    @Prop({ required:true, trim:true, maxlength:20 })
    name:string
    
    @Prop({ required:true, unique:true, trim:true, })
    email:string

    @Prop({ required:true, trim:true})
    password:string

    @Prop({default:null})
    phoneNumber: string

    @Prop({required:true, enum:UserRole})
    rol: UserRole
}


export const UserSchema = SchemaFactory.createForClass(User)
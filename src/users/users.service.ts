import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private readonly userEntity: Model<User>
  ) { }


  async create(createUserDto: CreateUserDto) {

    const { email } = createUserDto

    try {

      const usuarioExistente = await this.userEntity.findOne({ email })

      if (usuarioExistente) {
        throw new ConflictException('Ya existe un usuario con ese correo')
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

      const newUser = await this.userEntity.create({
        ...createUserDto,
        password: hashedPassword
      })

      const {password, ...userWithoutPassowrd} = newUser.toObject()

      return userWithoutPassowrd

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error al crear el usuario')
    }

  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

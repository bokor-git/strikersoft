
import * as HttpError from 'http-errors';
import {PrismaClient} from "@prisma/client";
import * as bcrypt from "bcryptjs";
const prisma = new PrismaClient()

export class UserService {
  async findOneById(id) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })
      if (!user) {
        throw new Error(HttpError.NotFound('User not exist'))
      }
      return user
    } catch (err) {
      throw HttpError.InternalServerError(err.message)
    }
  }

  async getUsersList() {
    try {
      return await prisma.user.findMany();
    } catch (err) {
      throw HttpError.InternalServerError(err.message)
    }
  }

  async deleteUserById(id) {
    try {
      const user = await this.findOneById(id)
      if (!user) {
        throw new Error(HttpError.NotFound('User not exist'))
      }
      const deleteUser = await prisma.user.delete({
        where: { id },
      })
      return deleteUser
    } catch (err) {
      throw HttpError.InternalServerError(err.message)
    }
  }


  async createUser({password, login}) {
    try {
      const user = await prisma.user.create({
        data: {
          password: bcrypt.hashSync(password, 8),
          login
        }
      })
      return user
    } catch (err) {
      throw HttpError.InternalServerError(err.message)
    }
  }

  async updateUser({password, login}, id) {
    try {
      const user = await this.findOneById(id)
      if (!user) {
        throw new Error(HttpError.NotFound('User not exist'))
      }
      let data: {password?: string, login?: string} = {}
      if (password && bcrypt.compareSync(password, user.password)) {
        data.password = bcrypt.hashSync(password, 8);
      }
      if (login && login!== user.login) {
        data.login = login;
      }
      const updated = await prisma.user.update({
        where: {
          id,
        },
        data,
      })
      return updated
    } catch (err) {
      throw HttpError.InternalServerError(err.message)
    }
  }
}

export default new UserService()
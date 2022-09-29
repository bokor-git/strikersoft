import * as bcrypt from 'bcryptjs';
import * as HttpError from 'http-errors';
import * as jwt from 'jsonwebtoken';

import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

export class AuthService {
  async validateUser (login, password) {
    try {
      const jwtSecret = process.env.JWT_SECRET
        const user = await prisma.user.findUnique({
          where: {
            login
          }
        });
        if (!user) {
          throw HttpError.NotFound('User not registered')
        }
        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) throw HttpError.Unauthorized('Email address or password not valid')
        delete user.password

       const accessToken =  jwt.sign({ user }, jwtSecret)
        return { ...user, accessToken }
    } catch (err) {
      throw HttpError.InternalServerError(err.message)
    }
  }
}

export default new AuthService()
import * as HttpError from 'http-errors';
import * as jwt from 'jsonwebtoken';
const isAuth = async (req, res, next) => {
  const jwtSecret = process.env.JWT_SECRET

  console.log(jwtSecret)
  if (!req.headers.authorization) {
    return next(HttpError.Unauthorized('Access token is required'))
  }

  const token = req.headers.authorization.split(' ')[1]
  if (!token) {
    return next(HttpError.Unauthorized())
  }
  console.log(token, jwtSecret)
  const auth = jwt.verify(token, jwtSecret)
  if (auth) {
    req.user = auth.user
    next()
  }
  else res.status(401).send(HttpError.Forbidden())
}
export default isAuth
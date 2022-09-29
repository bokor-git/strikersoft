import * as HttpError from 'http-errors';
import ROLES from "../constants";
const isAdmin = async (req, res, next) => {
  console.log(req.user.role)
  if (req.user.role === ROLES.ADMIN) {
    next()
  }
  else res.status(403).send(HttpError.Forbidden())
}

export default isAdmin
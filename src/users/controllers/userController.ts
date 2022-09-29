import userService, {UserService} from "../services/userService";

export class UsersController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  public get = async (req, res) =>  {
    try {
      const id = +req.params.id
      const user = await this.userService.findOneById(id)
      res.status(200).send(user)
    } catch (e) {
      res.status(500).send(e.message)
    }
  }

  public update = async (req, res) =>  {
    try {
      const id = +req.params.id
      const user = await this.userService.updateUser(req.body, id)
      res.status(200).send(user)
    } catch (e) {
      res.status(500).send(e.message)
    }
  }

  public create = async (req, res) =>  {
    try {
      const user = await this.userService.createUser(req.body)
      res.status(200).send(user)
    } catch (e) {
      res.status(500).send(e.message)
    }
  }

  public delete = async (req, res) =>  {
    try {
      const id = +req.params.id
      const user = await this.userService.deleteUserById(id)
      res.status(200).send(user)
    } catch (e) {
      res.status(500).send(e.message)
    }
  }

  public list = async (req, res) =>  {
    try {
      const users = await this.userService.getUsersList()
      res.status(200).send(users)
    } catch (e) {
      res.status(500).send(e.message)
    }
  }
}

export const userController = new UsersController(userService);
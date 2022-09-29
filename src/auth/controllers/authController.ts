import authService, {AuthService} from "../services/authService";

export class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public login = async (req, res) =>  {
    try {
      const { login, password } = req.body
      const user = await this.authService.validateUser(login, password)
      res.status(200).send(user)
    } catch (e) {
      console.log(e)
      res.status(500).send(e.message)
    }
  }
}

export const authController = new AuthController(authService);
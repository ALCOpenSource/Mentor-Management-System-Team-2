import { Request, Response } from "express";
import { ServiceContainer } from "../utils/container";
import UserService from "../service/api";

const userController = () => {
  return {
    login: async (req: Request, res: Response) => {
      const re: any = req;
      const container: ServiceContainer = re.container;
      const userSrc = container.get<UserService>("userSrv") as UserService;
      try {
        const { email, password } = req.body;
        const {user, token} = await userSrc.loginUserNormal({ email, password });
        res.cookie('token', token, { httpOnly: true, secure: true });
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json(error);
      }
    },

    forgotPasswordRequest: async (req: Request, res: Response) => {
      const re: any = req;
      const userSrc = re.container.get("userSrv");
      try {
        const { email } = req.body;
        const user = await userSrc.forgotPasswordRequest(email, req.header['X-Request-Id']);
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json(error);
      }
    },

   

    resetPassword: async (req: Request, res: Response) => {
      const re: any = req;
      const userSrc = re.container.get("userSrv");
      try {
        const { email } = req.body;
        const user = await userSrc.resetPassword(email);
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json(error);
      }
    },
  };
};

export default userController();

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
        const user = await userSrc.loginUserNormal({ email, password });
        res.status(200).json(user);
      } catch (error) {
        console.log(error, "ERROR IS HERE ==>");
        res.status(400).json(error);
      }
    },
  };
};

export default userController();

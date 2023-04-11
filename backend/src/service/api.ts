// some api service
// some api service
import { Sequelize } from "sequelize-typescript";
import { LoginUserDto } from "../dtos/user-dto";
import { APILogger } from "../logger/api.logger";
import UserRepo from "../repository/user.repo";
import { comparePassword, hashPassword } from "../utils";
import { BadRequestError, ForbiddenError } from "../utils/error";

const logger = new APILogger();

export default class UserService {
  private userRepo!: UserRepo;

  constructor(db: Sequelize) {
    this.userRepo = new UserRepo(db);

    console.log("user repo", this.userRepo);
  }

  /*
   * @desc login user with normal login method i.e email and password
   * @param payload - LoginUserDto
   * @returns user
   */

  public async loginUserNormal(payload: LoginUserDto) {
    console.log("payload", payload);
    const user = await this.userRepo.getUserByEmail(payload.email);

    if (!user) {
      logger.error("user not found");
      throw new BadRequestError("Email or password is incorrect");
    }
    console.log("User found");
    const isMatch = await comparePassword(payload.password, user.password);

    if (!isMatch) {
      logger.error("password is incorrect");
      throw new BadRequestError("Email or password is incorrect");
    }

    logger.info("user", user);
    console.log("I am expecting this");
    console.log("this is the user", user);
    return user;
  }

  public async getUser(userId: string) {
    const user = await this.userRepo.getUser(userId);
    logger.info("user", user);
    return user;
  }
}

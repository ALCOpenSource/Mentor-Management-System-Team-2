import { Sequelize } from "sequelize";
import { LoginUserDto } from "../dtos/user-dto";
import { APILogger } from "../logger/api.logger";
import UserRepo from "../repository/user.repo";
import { comparePassword, generateAccessToken } from "../utils";
import { BadRequestError, ForbiddenError } from "../utils/error";


const logger = new APILogger();

export default class UserService {
  private userRepo!: UserRepo;

  constructor(db: Sequelize) {
    this.userRepo = new UserRepo(db);
  }

  /*
   * @desc login user with normal login method i.e email and password
   * @param payload - LoginUserDto
   * @returns user
   */

  public async loginUserNormal(payload: LoginUserDto) {
    let user = await this.userRepo.getUserByEmail(payload.email);
    return user;
    // if (!user) {
    //   logger.error("user not found");
    //   throw new BadRequestError("Email or password is incorrect");
    // }
    // const isMatch = await comparePassword(payload.password, user.password);

    // if (!isMatch) {
    //   logger.error("password is incorrect");
    //   throw new BadRequestError("Email or password is incorrect");
    // }

    // const token = generateAccessToken(user.id);

    // logger.info("user", user);
    // return {user, token};
  }

  public async getUser(userId: string) {
    const user = await this.userRepo.getUser(userId);
    logger.info("user", user);
    return user;
  }

  

  public async resetPassword(userId: string, password: string) {
    const user = await this.userRepo.getUser(userId);

    if (!user) {
      logger.error("user not found");
      throw new Error("user not found");
    }

    user.password = password;

    await user.save();

    logger.info("user", user);
    return user;
  }

}

import { Sequelize } from "sequelize-typescript";
import { LoginUserDto } from "../dtos/user-dto";
import { APILogger } from "../logger/api.logger";
import UserRepo from "../repository/user.repo";
import PassResetRepo from "../repository/passwordReset.repo";
import { comparePassword, generateAccessToken, hashPassword } from "../utils";
import { BadRequestError, ForbiddenError } from "../utils/error";
import resetPassword from "../template/resetPasswordTemplate";
import MailService from "./mailService";

const logger = new APILogger();

export default class UserService {
  private userRepo!: UserRepo;
  private passRepo!: PassResetRepo;

  constructor(db: Sequelize) {
    this.userRepo = new UserRepo(db);
    this.passRepo = new PassResetRepo(db);
  }

  /*
   * @desc login user with normal login method i.e email and password
   * @param payload - LoginUserDto
   * @returns user
   */

  public async loginUserNormal(payload: LoginUserDto) {
    let user = await this.userRepo.getUserByEmail(payload.email);
    if (!user) {
      logger.error("user not found");
      throw new BadRequestError("Email or password is incorrect");
    }
    const isMatch = await comparePassword(payload.password, user.password);

    if (!isMatch) {
      logger.error("password is incorrect");
      throw new BadRequestError("Email or password is incorrect");
    }

    const token = generateAccessToken(user.id);

    logger.info("user", user);
    return {user, token} ;
  }

  public async getUser(userId: string) {
    const user = await this.userRepo.getUser(userId);
    logger.info("user", user);
    return user;
  }

  public async forgotPasswordRequest(email: string, header:string) {
    const user = await this.userRepo.getUserByEmail(email);

    if (!user) {
      logger.error("user not found");
      throw new BadRequestError("user not found");
    }

    // send email to user
    const passwordResetToken = await hashPassword(Date.now().toString());
    const passwordResetExpires =  Date.now() + 3600000;

    await this.passRepo.createPassToken({email, passwordResetToken,  passwordResetExpires});
    
    const link = `/passwordReset?token=${passwordResetToken}&id=${user.id}`;
     
    const emailTemp = resetPassword(link);

      //SEND FORGOT PASSWORD EMAIL
       const mailService = MailService.getInstance();
      await mailService.sendMail(header['X-Request-Id'], {
          to: email,
          subject: 'Reset Password',
          html: emailTemp.html,
      });
    logger.info("user", "Email Sent");
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

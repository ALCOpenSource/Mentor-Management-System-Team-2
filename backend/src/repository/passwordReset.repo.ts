import { Repository, Sequelize } from "sequelize-typescript";
import { PasswordReset } from "../model/passwordReset.model";


class PassResetRepo {
  private passRepo: Repository<PasswordReset>;
  constructor(db: Sequelize) {
    this.passRepo = db.getRepository(PasswordReset);
  }

  public async createPassToken<T>(data: T) {
    return this.passRepo.build(data as any);
  }

  public async getTokenById(userId: number) {
    return this.passRepo.findOne({ where: { userId } });
  }
}

export default PassResetRepo;
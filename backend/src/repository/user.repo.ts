import { Repository, Sequelize } from "sequelize-typescript";
import { User } from "../model/user.model";


class UserRepo {
  private userRepo: Repository<User>;
  constructor(db: Sequelize) {
    this.userRepo = db.getRepository(User);
  }

  public async getUser(userId: string) {
    return this.userRepo.findByPk(userId);
  }


  public async getUserByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }
}

export default UserRepo;

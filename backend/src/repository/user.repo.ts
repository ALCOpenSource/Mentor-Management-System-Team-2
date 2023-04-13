import { Sequelize} from "sequelize";
import { User } from "../model/user.model";


class UserRepo {
  private userRepo: typeof User;
  constructor(db: Sequelize) {
    this.userRepo = User;
  }

  public async getUser(userId: string) {
    return this.userRepo.findByPk(userId);
  }


   public async getUserByEmail(email: string) {
    return this.userRepo.findAll();
   }

}


export default UserRepo;

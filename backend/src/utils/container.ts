import UserService from "../service/api";

export const serviceContainer = ({ userSrv }: { userSrv: UserService }) => {
  return {
    userSrv,
    get<T>(key: string): T | undefined {
      const s: any = this;
      if (!s[key]) {
        console.log("Service not found");
        console.error(`Service not found : ${key}`);
        process.exit(1);
      }
      return s[key];
    },
  };
};

export type ServiceContainer = ReturnType<typeof serviceContainer>;

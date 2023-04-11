const config = () => {
  return {
    keys: {
      ACCESS_KEY: process.env.ACCESS_KEY as string,
      REFRESH_KEY: process.env.REFRESH_KEY as string,
    },

    accessTokenMaxAge: 60 * 60,
    refreshTokenMaxAge: 60 * 60,
  };
};

export default config;

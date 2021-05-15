const { getUser } = require("../../prisma/User");

const Query = {
  info: () => "ColorMyYear API",
  user: async (parent, args, context) => {
    return await getUser(args);
  }
};

module.exports = { Query };

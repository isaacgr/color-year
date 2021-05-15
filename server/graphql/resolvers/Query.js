const { getUser } = require("../../prisma/User");

const Query = {
  user: async (parent, args, context) => {
    return await getUser(args);
  }
};

module.exports = { Query };

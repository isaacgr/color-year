const { getPalette } = require("../../prisma/Palette");
const { getUser } = require("../../prisma/User");

const Query = {
  user: async (parent, args, context) => {
    return await getUser(args);
  },
  palette: async (parent, args, context) => {
    return await getPalette(args.userId);
  }
};

module.exports = { Query };

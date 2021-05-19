const { updatePalette } = require("../../prisma/Palette");

const Mutation = {
  setPalette: async (parent, args, context) => {
    return updatePalette(args);
  }
};

module.exports = Mutation;

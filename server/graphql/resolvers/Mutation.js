const { updatePalette } = require("../../prisma/Palette");
const { updatePaletteSet } = require("../../prisma/User");

const Mutation = {
  setPalette: async (parent, args, context) => {
    return updatePalette(args);
  },
  setUserPalette: async (parent, args, context) => {
    return updatePaletteSet(args);
  }
};

module.exports = Mutation;

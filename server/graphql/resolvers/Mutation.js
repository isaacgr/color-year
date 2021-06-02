const { updatePalette } = require("../../prisma/Palette");
const { updatePaletteSet } = require("../../prisma/User");
const { upsertDate } = require("../../prisma/Calendar");

const Mutation = {
  setPalette: async (parent, args, context) => {
    return updatePalette(args);
  },
  setUserPalette: async (parent, args, context) => {
    return updatePaletteSet(args);
  },
  setDayColor: async (parent, args, context) => {
    return upsertDate(args);
  }
};

module.exports = Mutation;

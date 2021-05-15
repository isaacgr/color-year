const { getPalette } = require("../../prisma/Palette");

const User = {
  async palette(user) {
    return await getPalette(user.id);
  }
};

module.exports = User;

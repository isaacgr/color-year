const { PrismaClient } = require("@prisma/client");
const { PaletteNotFoundError } = require("../types/error");

const prisma = new PrismaClient();

const getPalette = async (userId) => {
  try {
    return await prisma.palette.findUnique({
      where: {
        user_id: userId
      }
    });
  } catch {
    throw new PaletteNotFoundError(userId);
  }
};

module.exports = { getPalette };

const { PrismaClient } = require("@prisma/client");
const { PaletteNotFoundError, InvalidUserIdError } = require("../types/error");

const prisma = new PrismaClient();

const createPalette = async (data) => {
  let paletteExists;
  try {
    paletteExists = await prisma.palette.findUnique({
      where: {
        user_id: data.user_id
      }
    });
  } catch (e) {
    throw new InvalidUserIdError(data.user_id);
  }
  if (!paletteExists) {
    return await prisma.palette.create({
      data
    });
  } else {
    return await prisma.palette.findUnique({
      where: {
        user_id: data.user_id
      }
    });
  }
};

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

module.exports = { getPalette, createPalette };

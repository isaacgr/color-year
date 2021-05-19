const { PrismaClient } = require("@prisma/client");
const { PaletteNotFoundError, UpdatePaletteError } = require("../types/error");

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
    throw new PaletteNotFoundError(data.user_id);
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

const updatePalette = async ({ userId, paletteData }) => {
  try {
    await prisma.palette.findUnique({
      where: {
        user_id: userId
      }
    });
  } catch {
    throw new PaletteNotFoundError(userId);
  }
  try {
    return await prisma.palette.update({
      where: {
        user_id: userId
      },
      data: {
        ...paletteData
      }
    });
  } catch (e) {
    throw UpdatePaletteError(userId, e.message);
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

module.exports = { getPalette, createPalette, updatePalette };

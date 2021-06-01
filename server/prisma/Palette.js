const { PrismaClient } = require("@prisma/client");
const { NotFoundError, UpdateError, CreateError } = require("../types/error");

const prisma = new PrismaClient({
  rejectOnNotFound: true
});

const createPalette = async (data) => {
  try {
    return await prisma.palette.findUnique({
      where: {
        user_id: data.user_id
      }
    });
  } catch (e) {
    throw new CreateError(data.user_id, "User not found");
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
    throw new NotFoundError(userId, "User not found");
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
    throw new NotFoundError(userId);
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
    throw UpdateError(userId, e.message);
  }
};

module.exports = { getPalette, createPalette, updatePalette };

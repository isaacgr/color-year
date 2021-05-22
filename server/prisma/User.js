const { PrismaClient } = require("@prisma/client");
const { UserNotFoundError, InvalidUserIdError } = require("../types/error");

const prisma = new PrismaClient();

const createUser = async (data) => {
  let userExists;
  try {
    userExists = await prisma.user.findUnique({
      where: {
        external_id: data.external_id
      }
    });
  } catch {
    throw new InvalidUserIdError(data.external_id);
  }
  if (!userExists) {
    return await prisma.user.create({
      data
    });
  } else {
    return await prisma.user.findUnique({
      where: {
        external_id: data.external_id
      }
    });
  }
};

const getUser = async (data) => {
  let userExists;
  try {
    userExists = await prisma.user.findUnique({
      where: {
        id: data.id
      }
    });
  } catch {
    throw new UserNotFoundError(data.id);
  }

  if (!userExists) {
    throw new UserNotFoundError(data.id);
  } else {
    return await prisma.user.findUnique({
      where: {
        id: data.id
      },
      select: {
        id: true,
        palette_set: true
      }
    });
  }
};

const updatePaletteSet = async ({ userId, paletteSet }) => {
  let userExists;
  try {
    userExists = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });
  } catch {
    throw new UserNotFoundError(userId);
  }
  if (!userExists) {
    throw new UserNotFoundError(userId);
  } else {
    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        palette_set: paletteSet
      }
    });
    return user.palette_set;
  }
};

module.exports = { createUser, getUser, updatePaletteSet };

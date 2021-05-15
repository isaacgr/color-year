const { PrismaClient } = require("@prisma/client");
const { NonExistentUserError, InvalidUserIdError } = require("../types/error");

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
    throw new NonExistentUserError(data.id);
  }

  if (!userExists) {
    throw new NonExistentUserError(data.id);
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

module.exports = { createUser, getUser };

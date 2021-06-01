const { PrismaClient } = require("@prisma/client");
const { NotFoundError, UpdateError } = require("../types/error");

const prisma = new PrismaClient({
  rejectOnNotFound: true
});

const createDate = async (data) => {
  let dateExists;
  try {
    dateExists = await prisma.calendar.findUnique({
      where: {
        user_id: data.user_id
      }
    });
  } catch (e) {
    throw new NotFoundError(data.user_id);
  }
  if (!dateExists) {
    return await prisma.calendar.create({
      data
    });
  } else {
    return await prisma.calendar.findUnique({
      where: {
        user_id: data.user_id
      }
    });
  }
};

const getDate = async (userId) => {
  try {
    return await prisma.calendar.findUnique({
      where: {
        user_id: userId
      }
    });
  } catch {
    throw new NotFoundError(userId);
  }
};

const updateDate = async ({ userId, paletteData }) => {
  try {
    await prisma.calendar.findUnique({
      where: {
        user_id: userId
      }
    });
  } catch {
    throw new NotFoundError(userId);
  }
  try {
    return await prisma.calendar.update({
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

module.exports = {
  createDate,
  getDate,
  updateDate
};

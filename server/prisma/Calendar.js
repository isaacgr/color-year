const { PrismaClient } = require("@prisma/client");
const { NotFoundError, CreateError } = require("../types/error");

const prisma = new PrismaClient({
  rejectOnNotFound: true
});

const upsertDate = async ({ userId, date, value }) => {
  try {
    return await prisma.calendar.upsert({
      where: {
        calendar_user_id_date_key: { user_id: userId, date: new Date(date) }
      },
      create: {
        user_id: userId,
        date: new Date(date),
        value
      },
      update: {
        value
      }
    });
  } catch (e) {
    throw new CreateError(userId, e.message);
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

const getDates = async (userId) => {
  try {
    return await prisma.calendar.findMany({
      where: {
        user_id: userId
      }
    });
  } catch {
    throw new NotFoundError(userId);
  }
};

module.exports = {
  upsertDate,
  getDate,
  getDates
};

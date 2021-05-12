const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createUser = async (data) => {
  const userExists = await prisma.user.findUnique({
    where: {
      external_id: data.external_id
    }
  });
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

module.exports = { createUser };

const Query = {
  info: () => "ColorMyYear API",
  users: async (parent, args, context) => {
    return context.prisma.user.findMany();
  }
};

module.exports = { Query };

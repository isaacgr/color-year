const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    info: String!
    users: [User]!
  }

  type User {
    id: ID!
    display_name: String!
  }
`;

module.exports = typeDefs;

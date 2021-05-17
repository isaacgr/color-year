const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    user(id: ID!): User!
    palette(userId: ID!): Palette
  }

  type User {
    id: ID!
    palette_set: Boolean!
    palette: Palette
  }

  type Palette {
    joy: String
    sadness: String
    anger: String
    fear: String
    trust: String
    jealous: String
    surprise: String
    anticipation: String
    spiritual: String
    neutral: String
  }
`;

module.exports = typeDefs;

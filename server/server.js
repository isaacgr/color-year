require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");

const { Query } = require("./graphql/resolvers/Query");
const Mutation = require("./graphql/resolvers/Mutation");
const User = require("./graphql/resolvers/User");
const typeDefs = require("./graphql/schema");

const { PrismaClient } = require("@prisma/client");

require("./config/passport");

const publicPath = path.join(__dirname, "..", "public");
const PORT = process.env.PORT || 5000;
const app = express();
const prisma = new PrismaClient();

// GraphqlServer
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: {
    Query,
    Mutation,
    User
  },
  context: {
    prisma
  }
});

// Cors
app.use(cors());

//Configure Session Storage
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1 * 60 * 60 * 1000
    },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined
    })
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
server.applyMiddleware({ app, path: "/graphql" });

app.use(express.static(publicPath));

app.get("*", (request, response) => {
  response.sendFile(path.join(publicPath, "index.html"));
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

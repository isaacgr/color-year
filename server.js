require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { Query } = require("./graphql/resolvers/Query");
const typeDefs = require("./graphql/schema");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const session = require("express-session");

require("./config/passport");

const publicPath = path.join(__dirname, "public");
const PORT = process.env.PORT || 5000;
const app = express();

// GraphqlServer
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: {
    Query
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
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", require("./routes/auth"));

app.use(express.static(publicPath));

app.get("*", (request, response) => {
  response.sendFile(path.join(publicPath, "index.html"));
});

server.applyMiddleware({ app });
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { Query } = require("./graphql/resolvers/Query");
const typeDefs = require("./graphql/schema");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const cookieSession = require("cookie-session");

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
  cookieSession({
    name: "session-name",
    keys: ["key1", "key2"]
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect("/");
//   }
// );

// //Logout
// app.get("/logout", (req, res) => {
//   req.session = null;
//   req.logout();
//   res.redirect("/");
// });

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

app.use(express.static(publicPath));

app.get("*", (request, response) => {
  response.sendFile(path.join(publicPath, "index.html"));
});

server.applyMiddleware({ app });
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

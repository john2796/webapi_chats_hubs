const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");

//import routes
const hubsRoutes = require("./hubs/hubs-router");

//initialize
const server = express();

//middleware
server.use(express.json());
server.use(helmet());
server.use(logger("dev"));
server.use(auth);

//connect routes
server.use("/api/hubs", hubsRoutes);
//route test
server.get("/api/test", auth, (req, res) => {
  res.send("it works");
});

//custom middleware
function gateKeepa(req, res, next) {
  const sec = new Date().getSeconds();
  if (sec % 3 === 0) {
    res.status(403).json({ you: "shall not pass" });
  } else {
    next();
  }
}
function auth(req, res, next) {
  const password = req.headers.authorization;
  if (password === "dizznuts") {
    next();
  } else {
    res
      .status(401)
      .json({ message: "Please login to access this information" });
  }
}

//server dev mode
server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});

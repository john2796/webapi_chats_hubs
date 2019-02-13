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
//connect routes
server.use("/api/hubs", hubsRoutes);
server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});

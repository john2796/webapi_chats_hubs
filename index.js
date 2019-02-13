const express = require("express");

//import routes
const hubsRoutes = require("./hubs/hubs-router");
//initialize
const server = express();
//middleware
server.use(express.json());
//connect routes
server.use("/api/hubs", hubsRoutes);
server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});

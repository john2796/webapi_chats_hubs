const express = require("express");

//import routes
const hubRoutes = require("./hubs/hubs-model");
//initialize
const server = express();
//middleware
server.use(express.json());
//connect routes
server.use("/api/hubs", hubRoutes);
server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});

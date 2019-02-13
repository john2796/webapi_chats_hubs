const express = require("express");
const server = express.Router();
const Hubs = require("./hubs-model");
server.get("/test", (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

server.get("/", async (req, res) => {
  try {
    const hubs = await Hubs.find(req.query);
    res.status(200).json(hubs);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the hubs"
    });
  }
});

server.get("/:id", async (req, res) => {
  try {
    const hub = await Hubs.findById(req.params.id);
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: "hub not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving the hub" });
  }
});

server.post("/", async (req, res) => {
  try {
    const hub = await Hubs.add(req.body);
    res.status(201).json(hub);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error adding the hub"
    });
  }
});

server.delete("/:id", async (req, res) => {
  try {
    const count = await Hubs.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The hub has been nuked" });
    } else {
      res.status(404).json({ message: "The hub could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error removing the hub"
    });
  }
});

server.put("/:id", async (req, res) => {
  try {
    const hub = await Hubs.update(req.params.id, req.body);
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: "The hub could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error updating the hub"
    });
  }
});
//sub-route
// add an endpoint that returns all the messages for a hub
server.get("/:id/messages", async (req, res) => {
  try {
    const messages = await Hubs.findHubMessages(req.params.id);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error getting messages for the hub" });
  }
});
// add an endpoint for adding new message to a hub
server.post("/:id/messages", async (req, res) => {
  const messageInfo = { ...req.body, hub_id: req.params.id };
  try {
    const message = await Hubs.addMessage(messageInfo);
    //get here..
    res.status(210).json(message);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error posting the messages for the hub"
    });
  }
});

module.exports = server;

// view ==> actionCreator ==> middleware ==> reducer ==> store ==> gobacktoview

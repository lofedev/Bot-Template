// © Lofe 2020
// bot.js

require("dotenv").config();
const { Client } = require("discord.js");
const { registerCommands, registerEvents } = require("./utils/registry");
const client = new Client();
const express = require("express");
const slash = require("express-slash");
const app = express();
const fs = require("fs");

(async () => {
  client.commands = new Map();
  client.events = new Map();
  await registerCommands(client, "../commands");
  await registerEvents(client, "../events");
  await client.login(process.env.BOT_TOKEN);
})();

// © Lofe 2020
// Express Stuff

const keepalive = require("express-glitch-keepalive");

app.use(keepalive);

app.get("/", (req, res) => {
  res.status(200).json({success: "true", message: "Operating regularly!"})
})

/* Initialise Express */

app.listen(process.env.PORT);

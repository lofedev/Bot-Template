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

app.get("/api/v1/verification/:user/:code", (req, res) => {
  console.log(req.params.user)
  console.log(req.params.code)

  let codes = JSON.parse(fs.readFileSync("codes.json", "utf8"));

  if (codes[req.params.user].code == "REVOKED") {
    res.json("Verified")
    return
  }

  codes[req.params.user] = {
     code: req.params.code
   };

  fs.writeFile("codes.json", JSON.stringify(codes), err => {
    if (err) {
      console.log(err)
    }
  });

  res.json("Success")
})

/* Initialise Express */

app.listen(process.env.PORT);

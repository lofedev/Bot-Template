const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const fetch = require('node-fetch');
const fs = require('fs');

module.exports = class BallCommand extends BaseCommand {
  constructor() {
    super("auth", "Verification", []);
  }

  run(client, message, args) {
    let codes = JSON.parse(fs.readFileSync("codes.json", "utf8"))

    if (codes[args[0]]) {
      if (codes[args[0]].code == "REVOKED") {
        return message.channel.send("Invalid username or verification code.")
      }
    
      if (codes[args[0]].code == args[1]) {
        if (codes[args[0]].code == "REVOKED") {
          return message.channel.send("Invalid username or verification code.")
        }

        codes[args[0]] = {
          code: "REVOKED"
        };

        fs.writeFile("codes.json", JSON.stringify(codes), err => {
          if (err) {
            console.log(err);
            return
          } else {
            message.member.roles.add("729722828559220747")
            message.member.send("Verified!")
            return
          }
        });
      } else {
        return message.channel.send("Invalid username or verification code. (code)")
      }
    } else {
      return message.channel.send("Invalid username or verification code.")
    }
  }
};
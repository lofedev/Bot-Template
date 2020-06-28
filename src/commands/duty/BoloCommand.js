const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const fs = require("fs");
const database = require("../../../bolo.json")

module.exports = class PrefixCommand extends BaseCommand {
  constructor() {
    super("bolo", "Duty", []);
  }

  run(client, message, args) {
    if (!message.member.roles.cache.has("716439080686321766")) return message.channel.send("<:warn:716454698621861920> | You must be **10-8** to use this system.")
    
    if(args[0] == "set") {
      if (!args[2]) return message.channel.send("<:warn:716454698621861920> | **Invalid usage!** Use `bolo set (USER) (REASON)`!")
      
      let bolo = JSON.parse(fs.readFileSync("bolo.json", "utf8"));

      bolo[args[1]] = {
        reason: args.slice(2).join(" ")
      };

      fs.writeFile("bolo.json", JSON.stringify(bolo), err => {
        if (err) {
          console.log(err);
          message.channel.send(err)
          message.channel.send("<:warn:716454698621861920> | **An error occurred!** You should never see a message like this - please contact a developer and quote the error message!");
        } else {
          console.log(bolo)
          console.log(JSON.stringify(bolo))
          message.channel.send("<:done:716455107851583590> | **Success!** Bolo set for: " + args.slice(2).join(" "))
        }
      });
      
      return
    }
    
    if(args[0] == "remove") {
      if (!args[1]) return message.channel.send("<:warn:716454698621861920> | **Invalid usage!** Use `bolo remove (USER)`!")
      
      let bolo = JSON.parse(fs.readFileSync("bolo.json", "utf8"));

      bolo[args[1]] = {
        reason: "REVOKED"
      };

      fs.writeFile("bolo.json", JSON.stringify(bolo), err => {
        if (err) {
          console.log(err);
          message.channel.send(err)
          message.channel.send("<:warn:716454698621861920> | An error occurred! You should never see a message like this - please contact a developer and quote the error message!");
        } else {
          console.log(bolo)
          console.log(JSON.stringify(bolo))
          message.channel.send("<:done:716455107851583590> | **Success!** Bolo removed from: " + args.slice(1).join(" "))
        }
      });
      
      return
    }
    
    let bolo = JSON.parse(fs.readFileSync("bolo.json", "utf8"));
    
    if (bolo[args.join(" ")]) {
      if (bolo[args.join(" ")].reason == "REVOKED") return message.channel.send("📻 | Could not find a BOLO for this query.")
      
      message.channel.send("<:warn:716454698621861920> | **BOLO LOCATED** \nFor: " + args[0] + " \nReason: " + bolo[args.join(" ")].reason)
    } else {
      message.channel.send("<:warn:716454698621861920> | Could not find a BOLO for this query.")
    }
  }
}
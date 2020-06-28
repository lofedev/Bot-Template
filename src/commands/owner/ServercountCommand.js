const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");

module.exports = class EvalCommand extends BaseCommand {
  constructor() {
    super("servercount", "Owner", ["sc", "serverc", "scount"]);
  }

  run(client, message, args) {
    // Permission System
    const fs = require("fs")
        
    let commandLevel = 99
    let perm = JSON.parse(fs.readFileSync("permissions.json", "utf8"));
    if (!perm[message.author.id]) return message.channel.send("<:warn:716454698621861920> | **An error occurred!** Invalid permissions!")
    if (!(parseInt(perm[message.author.id].level) >= commandLevel)) return message.channel.send("<:warn:716454698621861920> | **An error occurred!** Invalid permissions! Required level: **" + commandLevel + "**")
    
    // Command
    let size = client.guilds.cache.size;
    message.channel.send(size + " servers!");
  }
};

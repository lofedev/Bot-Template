const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const fs = require("fs");

module.exports = class PrefixCommand extends BaseCommand {
  constructor() {
    super("duty", "Duty", ["10-8", "10-7"]);
  }

  run(client, message, args) {
    if (!message.member.roles.cache.has("716642255321956374")) return message.channel.send("<:warn:716454698621861920> | **An error occurred!** You are not authorised to use this command.")
    
    if (message.member.roles.cache.has("716439080686321766")) {
      message.member.roles.remove("716439080686321766")
      message.channel.send("<:done:716455107851583590> | You are now **10-7**.")
    } else {
      message.member.roles.add("716439080686321766")
      message.channel.send("<:done:716455107851583590> | You are now **10-8**.")
    }
  }
}
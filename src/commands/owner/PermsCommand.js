const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const fs = require("fs");
const database = require("../../../bolo.json")

module.exports = class PrefixCommand extends BaseCommand {
  constructor() {
    super("perms", "Owner", ["permission", "permlevel"]);
  }

  run(client, message, args) {
    if(args[0] == "set") {
      let commandLevel = 99
      let perm = JSON.parse(fs.readFileSync("permissions.json", "utf8"));
      if (!perm[message.author.id]) return message.channel.send("<:warn:716454698621861920> | **An error occurred!** Invalid permissions! Required level: **" + commandLevel + "**")
      if (!(parseInt(perm[message.author.id].level) >= commandLevel)) return message.channel.send("<:warn:716454698621861920> | **An error occurred!** Invalid permissions! Required level: **" + commandLevel + "**")
      
      if (!args[2]) return message.channel.send("<:warn:716454698621861920> | **Invalid usage!** Use `perms set (USER) (LEVEL)`!")

      perm[message.mentions.users.first().id] = {
        level: args[2]
      };

      fs.writeFile("permissions.json", JSON.stringify(perm), err => {
        if (err) {
          console.log(err);
          message.channel.send(err)
          message.channel.send("<:warn:716454698621861920> | **An error occurred!** You should never see a message like this - please contact a developer and quote the error message!");
        } else {
          console.log(perm)
          console.log(JSON.stringify(perm))
          message.channel.send("<:done:716455107851583590> | **Success!** Permissions changed!")
        }
      });
      
      return
    }
    
    let perm = JSON.parse(fs.readFileSync("permissions.json", "utf8"));
    
    if (!args[0]) {
       if (perm[message.author.id]) {
        if (perm[message.author.id].level == "0") return message.channel.send("<:done:716455107851583590> | Permission level is: **0 (User).**")
        if (perm[message.author.id].level == "1") return message.channel.send("<:done:716455107851583590> | Permission level is: **1 (LEO).**")
        if (perm[message.author.id].level == "2") return message.channel.send("<:done:716455107851583590> | Permission level is: **2 (Moderator).**")
        if (perm[message.author.id].level == "3") return message.channel.send("<:done:716455107851583590> | Permission level is: **3 (Administrator).**")
        if (perm[message.author.id].level == "99") return message.channel.send("<:done:716455107851583590> | Permission level is: **99 (Bot Owner).**")
        else return message.channel.send("<:done:716455107851583590> | Permission level is set incorrectly. Please contact a Developer to fix this.")
      } else {
         return message.channel.send("<:done:716455107851583590> | Permission level is: **0 (User).**")
      }
    }
    
    if (perm[message.mentions.users.first().id]) {
      if (perm[message.mentions.users.first().id].level == "0") return message.channel.send("<:done:716455107851583590> | Permission level is: **0 (User).**")
      if (perm[message.mentions.users.first().id].level == "1") return message.channel.send("<:done:716455107851583590> | Permission level is: **1 (LEO).**")
      if (perm[message.mentions.users.first().id].level == "2") return message.channel.send("<:done:716455107851583590> | Permission level is: **2 (Moderator).**")
      if (perm[message.mentions.users.first().id].level == "3") return message.channel.send("<:done:716455107851583590> | Permission level is: **3 (Administrator).**")
      if (perm[message.mentions.users.first().id].level == "99") return message.channel.send("<:done:716455107851583590> | Permission level is: **99 (Bot Owner).**")
      else return message.channel.send("<:done:716455107851583590> | Permission level is set incorrectly. Please contact a Developer to fix this.")
    } else {
       return message.channel.send("<:done:716455107851583590> | Permission level is: **0 (User).**")
    }
  }
}


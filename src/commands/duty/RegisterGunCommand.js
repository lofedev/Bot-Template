const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const fs = require("fs");

module.exports = class RegisterGunCommand extends BaseCommand {
  constructor() {
    super("registergun", "Duty", ["reggun", "guns", "gun", "weapon"]);
  }

  run(client, message, args) { 
    if(args[0] == "apply") {
      if (!args[1]) return message.channel.send("<:warn:716454698621861920> | **Invalid usage!** Use `guns apply (USER)`!")
      
      let guns = JSON.parse(fs.readFileSync("guns.json", "utf8"));
      
      if (guns[args[1]] && guns[args[1]].reason == "Valid") return message.channel.send("<:warn:716454698621861920> | **An error occurred!** You already own a gun license! Use `guns set (USER) (STATUS)` to update it!")
      
      guns[args[1]] = {
        reason: 'Valid',
        owner: message.author.id
      };

      fs.writeFile("guns.json", JSON.stringify(guns), err => {
        if (err) {
          console.log(err);
          message.channel.send(err)
          message.channel.send("<:warn:716454698621861920> | **An error occurred!** You should never see a message like this - please contact a developer and quote the error message!");
        } else {
          console.log(guns)
          console.log(JSON.stringify(guns))
          message.channel.send("<:done:716455107851583590> | **Success!** Your gun license application was successful " + args[1])
        }
      });
      
      return
    }
    
    if(args[0] == "set") {
      if (!args[2]) return message.channel.send("<:warn:716454698621861920> | **Invalid usage!** Use `guns set (USER) (STATUS)`!")
      
      let guns = JSON.parse(fs.readFileSync("guns.json", "utf8"));
      
      console.log(guns[args[1]].owner)
      
      if (message.author.id != guns[args[1]].owner) return message.channel.send("<:warn:716454698621861920> | **An error occurred!** You must own this license to set this license's status!")
      
      guns[args[1]] = {
        reason: args.slice(2).join(" "),
        owner: guns[args[1]].owner
      };

      fs.writeFile("guns.json", JSON.stringify(guns), err => {
        if (err) {
          console.log(err);
          message.channel.send(err)
          message.channel.send("<:warn:716454698621861920> | **An error occurred!** You should never see a message like this - please contact a developer and quote the error message!");
        } else {
          console.log(guns)
          console.log(JSON.stringify(guns))
          message.channel.send("<:done:716455107851583590> | **Success!** Guns updated for: " + args[1])
        }
      });
      
      return
    }
    
    if(args[0] == "remove") {
      if (!args[1]) return message.channel.send("<:warn:716454698621861920> | **Invalid usage!** Use `guns remove (USER)`!")
      
      let guns = JSON.parse(fs.readFileSync("guns.json", "utf8"));
      
        if (message.author.id != guns[args[1]].owner) return message.channel.send("<:warn:716454698621861920> | **An error occurred!** You must own this license to set this license's status!")
      
      guns[args[1]] = {
        reason: "REVOKED",
        owner: guns[args[1]].owner
      };

      fs.writeFile("guns.json", JSON.stringify(guns), err => {
        if (err) {
          console.log(err);
          message.channel.send(err)
          message.channel.send("<:warn:716454698621861920> | An error occurred! You should never see a message like this - please contact a developer and quote the error message!");
        } else {
          console.log(guns)
          console.log(JSON.stringify(guns))
          message.channel.send("<:done:716455107851583590> | **Success!** Guns removed from: " + args[1])
        }
      });
      
      return
    }
    
    let guns = JSON.parse(fs.readFileSync("guns.json", "utf8"));
    
    if (guns[args.join(" ")]) {
      if (guns[args.join(" ")].reason == "REVOKED") return message.channel.send("📻 | Could not find a gun license for this query.")
      
      message.channel.send("<:warn:716454698621861920> | **LICENSE LOCATED** \nFor: " + args[0] + " \nStatus: " + guns[args.join(" ")].reason)
    } else {
      message.channel.send("<:warn:716454698621861920> | Could not find a gun license for this query.")
    }
  }
}
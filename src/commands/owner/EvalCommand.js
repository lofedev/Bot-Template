const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
const { inspect } = require("util")

module.exports = class EvalCommand extends BaseCommand {
  constructor() {
    super('eval', 'Owner', ["exec", "code"]);
  }

  run(client, message, args) {
    
    // Permission System
    const fs = require("fs")
        
    let commandLevel = 99
    let perm = JSON.parse(fs.readFileSync("permissions.json", "utf8"));
    if (!perm[message.author.id]) return message.channel.send("<:warn:716454698621861920> | **An error occurred!** Invalid permissions! Required level: **" + commandLevel + "**")
    if (!(parseInt(perm[message.author.id].level) >= commandLevel)) return message.channel.send("<:warn:716454698621861920> | **An error occurred!** Invalid permissions! Required level: **" + commandLevel + "**")
    
    // Command
    try {
      const toEvaluate = args.join(" ")
      const evaluated = eval(toEvaluate)

      let embed = new Discord.MessageEmbed()
        .setColor('965555')
        .setTitle('Eval')
        .setDescription('Evaluated without an error!')
        .addField(":inbox_tray: Input", args.join(" "), false)
        .addField(":outbox_tray: Output", `\`\`\`javascript\n${evaluated}\n\`\`\``, false)
        .setFooter("Lofe")

        message.channel.send(embed)
    } catch(e) {
        let embed = new Discord.MessageEmbed()
        .setColor('965555')
        .setTitle('Eval')
        .setDescription('An error occurred!')
        .addField(':x: Error', `\`\`\`${e.message}\`\`\``, false)
        .setFooter("Lofe")

        message.channel.send(embed)
    }
    
    function clean(text) {
      if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
          return text;
    }
    
  }
}  
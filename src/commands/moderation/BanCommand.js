const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'Moderation', []);
  }

  run(client, message, args) {
    // Permission System
    const fs = require("fs")
        
    let commandLevel = 3
    let perm = JSON.parse(fs.readFileSync("permissions.json", "utf8"));
    if (!perm[message.author.id]) return message.channel.send("<:warn:716454698621861920> | **An error occurred!** Invalid permissions! Required level: **" + commandLevel + "**")
    if (!(parseInt(perm[message.author.id].level) >= commandLevel)) return message.channel.send("<:warn:716454698621861920> | **An error occurred!** Invalid permissions! Required level: **" + commandLevel + "**")
    
    // Command

    if (message.mentions.members.size === 0)
      return message.reply("❗ | Please mention a user to ban!");

    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      return message.channel.send("❗ | An error occured: I don't seem to have permissions to ban members. Please check my permissions then try again.");

    const target = message.mentions.members.first();
    
    if (target.id == message.guild.owner.id) {
      return message.channel.send("❗ | You cannot ban the server owner! Bad.")
    }
    
    if(target.id == message.author.id) {
      return message.channel.send("❗ | Don't be like Lofe. Ban another user that isn't yourself.")
    }

    let embed = new Discord.MessageEmbed()
     /* Embed */
    .setTitle("⚒️ | You have been **banned** from " + message.guild.name + " by " + message.author.tag + " for " + args.slice(1).join(" ") + "!")
    .setColor(process.env.EMBED_COLOR)
    
    /* Footer */
    .setFooter("Lofe")
    .setTimestamp();
    
    try {
      target.send(embed).then(
        target.ban(args.join(" ")).then(member => {
          message.reply(`<:done:716455107851583590> | ${member.user.username} was succesfully banned for ${args.slice(1).join(" ")}.`);
        })
      )
    } catch(e) {
      message.channel.send("❗ | Could not ban user:\n" + e + "\nPlease report this to a developer.")
    }
  }     
}
    
    
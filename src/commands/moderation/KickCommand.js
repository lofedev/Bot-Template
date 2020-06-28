const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'Moderation', []);
  }

  run(client, message, args) {
    // Permission System
    const fs = require("fs")
        
    let commandLevel = 2
    let perm = JSON.parse(fs.readFileSync("permissions.json", "utf8"));
    if (!perm[message.author.id]) return message.channel.send("<:warn:716454698621861920> | **An error occurred!** Invalid permissions! Required level: **" + commandLevel + "**")
    if (!(parseInt(perm[message.author.id].level) >= commandLevel)) return message.channel.send("<:warn:716454698621861920> | **An error occurred!** Invalid permissions! Required level: **" + commandLevel + "**")
    
    // Command

    if (message.mentions.members.size === 0)
      return message.reply("❗ | Please mention a user to kick");
    
    const target = message.mentions.members.first();

    if (!message.guild.me.hasPermission("KICK_MEMBERS"))
      return message.reply("❗ | An error occured: I don't seem to have permissions to kick members. Please check my permissions then try again.");
    
    if (target.id == message.guild.owner.id) {
      return message.channel.send("❗ | You cannot kick the server owner! Bad.")
    }
    
    if(target.id == message.author.id) {
      return message.channel.send("❗ | Don't be like Lofe. Kick another user that isn't yourself.")
    }
    
    let embed = new Discord.MessageEmbed()
     /* Embed */
    .setTitle("⚒️ | You have been **kicked** from " + message.guild.name + " by " + message.author.tag + " for " + args.slice(1).join(" ") + "!")
    .setColor(process.env.EMBED_COLOR)
    
    /* Footer */
    .setFooter("Lofe")
    .setTimestamp();
    
    try {
      target.send(embed).then(
        target.kick(args.join(" ")).then(member => {
          message.reply(`<:done:716455107851583590> | ${member.user.username} was succesfully kicked for ${args.slice(1).join(" ")}.`);
        })
      )
    } catch(e) {
      message.channel.send("❗ | Could not kick user:\n" + e + "\nPlease report this to a developer.")
    }
  }
}
    
    
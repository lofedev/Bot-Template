const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'Help', ["lag", "latency"]);
  }

  run(client, message, args) {
    let embed = new Discord.MessageEmbed()
     /* Embed */
    .setTitle(":ping_pong: Pong!")
    .setColor(process.env.EMBED_COLOR)
    
    /* Main */
    .addField("⤵️", Math.floor(Date.now() - message.createdTimestamp) + "ms", true)
    .addField("🖥️", Math.floor(client.ws.ping) + "ms", true)
    
    /* Footer */
    .setFooter("Lofe")
    .setTimestamp();
    
    message.channel.send(embed)
  }
}  
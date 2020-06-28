const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports = class BallCommand extends BaseCommand {
  constructor() {
    super("8ball", "Fun", ["fortune"]);
  }

  run(client, message, args) {
    const responses = [
      "As I see it, yes.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "It is certain.",
      "It is decidedly so.",
      "Most likely.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Outlook good.",
      "Reply hazy, try again.",
      "Signs point to yes.",
      "Very doubtful.",
      "Without a doubt.",
      "Yes.",
      "Yes – definitely.",
      "You may rely on it."
    ]
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    let embed = new Discord.MessageEmbed()
     /* Embed */
    .setTitle(response)
    .setColor(process.env.EMBED_COLOR)
    
    /* Footer */
    .setFooter("Lofe")
    .setTimestamp();
    
    message.channel.send(embed)
  }
};
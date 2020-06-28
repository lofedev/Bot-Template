const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports = class MemeCommand extends BaseCommand {
  constructor() {
    super("meme", "Fun", ["memes"]);
  }

  run(client, message, args) {
    (async () => {  
      fetch('https://apis.duncte123.me/meme')
        .then(res => res.json())
        .then(json => {
          let embed = new Discord.MessageEmbed()
          .setTitle(json.data.title)
          .setColor(process.env.EMBED_COLOR)
          .setImage(json.data.image)
          .setFooter("Lofe")
          .setTimestamp();
          message.channel.send(embed)
      });
    })();
  }
};
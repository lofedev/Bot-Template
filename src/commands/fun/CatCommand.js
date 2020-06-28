const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports = class CatCommand extends BaseCommand {
  constructor() {
    super("kitten", "Fun", ["cat"]);
  }

  run(client, message, args) {
    (async () => {  
      fetch('http://aws.random.cat/meow')
        .then(res => res.json())
        .then(json => {
          let embed = new Discord.MessageEmbed()
          .setTitle("Here is your cat!")
          .setColor(process.env.EMBED_COLOR)
          .setImage(json.file)
          .setFooter("Lofe")
          .setTimestamp();
          message.channel.send(embed)
      });
    })();
  }
};
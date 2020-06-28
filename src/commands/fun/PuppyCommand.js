const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports = class DogCommand extends BaseCommand {
  constructor() {
    super("puppy", "Fun", ["dog"]);
  }

  run(client, message, args) {
    (async () => {  
      fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(json => {
          let embed = new Discord.MessageEmbed()
          .setTitle("Here is your dog!")
          .setColor(process.env.EMBED_COLOR)
          .setImage(json.message)
          .setFooter("Lofe")
          .setTimestamp();
          message.channel.send(embed)
      });
    })();
  }
};
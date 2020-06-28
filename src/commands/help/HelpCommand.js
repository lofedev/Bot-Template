const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super("help", "Help", ["commands", "cmds"]);
  }

  run(client, message, args) {
    let embed = new Discord.MessageEmbed()
      /* Embed */
      .setTitle("Commands")
      .setColor(process.env.EMBED_COLOR)

      /* Main */
      .addField("Customisation","**prefix** - Set your server's prefix! (Requires Manage Server permission)",false)
      .addField("Fun","**meme** - Sends you a meme!\n**dog** - Sends you a picture of a dog!\n**cat** - Sends you a cute picture of a cat!",false)
      .addField("Moderation","**ban** - Bans a user.\n**kick** - Kicks a user.\n**purge** - Purge an amount of messages from 2-100!",false)
      .addField("Owner","**eval** - Evaluate code on the server.\n**servercount** - Tells you the amount of servers i'm in.",false)

      /* Footer */
      .setFooter("Lofe")
      .setTimestamp();

    message.channel.send(embed);
  }
};

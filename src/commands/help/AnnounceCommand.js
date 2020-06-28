const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");

module.exports = class AnnounceCommand extends BaseCommand {
  constructor() {
    super("announce", "Help", ["announcement"]);
  }

  run(client, message, args) {
    try {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send(
          "<:warn:716454698621861920> | You do not have permissions to do that! You require ``MANAGE_MESSAGES`` perms."
        );
      }
    } catch (e) {
      console.log(e);
    }

    if (!args[0]) {
      return message.channel.send(
        "<:warn:716454698621861920> | Invalid usage! Usage: `announce (ANNOUNCEMENT)`"
      );
    }
    try {
      let embed = new Discord.MessageEmbed()
        .setTitle("Announcement")
        .setDescription(args.join(" "))
        .setTimestamp()
        .setColor(process.env.EMBED_COLOR)
        .setFooter("Lofe");
      message.channel.send(embed);
      message.delete();
      message.member.send("Successfully announced!");
    } catch (e) {
      message.channel.send("An error occured. Please try again later.");
      console.log(e);
    }
  }
};

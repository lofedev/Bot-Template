const BaseEvent = require('../../utils/structures/BaseEvent');
const fs = require("fs")

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    /* Prefix Shit */
    let prefixes = JSON.parse(fs.readFileSync("prefixes.json", "utf8"));

    if (!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
      };
    }

    let prefix = prefixes[message.guild.id].prefixes;
    // let prefix = process.env.PREFIX
    if (!message.content.startsWith(prefix)) return;
    
    if (message.author.bot) return;
    const [cmdName, ...cmdArgs] = message.content
      .slice(prefix.length)
      .trim()
      .split(/\s+/);
    const command = client.commands.get(cmdName);
    if (command) {
      command.run(client, message, cmdArgs);
    }
  }
}
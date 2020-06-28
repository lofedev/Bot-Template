const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    // Rotating Status
  
    let activities = [ 
      "your status.",
      "you.",
      "me.",
      "no.",
      "yes.",
      "maybe.",
      "so?"
    ], i = 0; 

    client.user.setActivity('over you!', { type: 'WATCHING' })
    .then(console.log("Status set!"))
     
    console.log(`${client.user.username} is serving ${client.guilds.cache.size} guilds with ${client.users.cache.size} members.`)
  }
}
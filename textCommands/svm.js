const config = require('../config.json');
const intro = require('../intro');

module.exports = {
	name: 'svm',
	async execute(message, args, client) {
    if (message.member.permissions.has('MANAGE_MESSAGES') || message.author.id == config.caretakerId) {
      let guild = await client.guilds.fetch(config.guildId);
      let memtosend = await guild.members.fetch(message.mentions.users.first());
      intro.initiateVerification(memtosend,client);
      message.reply({content:"Verification message sent."});
    } else {
      message.reply({content:"You do not have permission to use this command!"})
    }
  }
}
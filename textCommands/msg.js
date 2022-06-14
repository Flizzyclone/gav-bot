module.exports = {
	name: 'msg',
	async execute(message, args, client) {
    if (message.member.permissions.has('MANAGE_MESSAGES')) {
      let channelId = args[2];
      channelId = channelId.replace('>','');
      channelId = channelId.replace('!','');
      channelId = channelId.replace('<#','');
      let channel;
      try {
        channel = await client.channels.fetch(channelId);
      } catch (error) {
        message.channel.send({content:'Cant find channel'});
        return false;
      }
      let messageToSend = args;
      messageToSend.splice(0, 3);
      messageToSend = messageToSend.join(' ');
      try {
        channel.send({content:messageToSend});
        message.channel.send({content:'Message Sent!'});
      } catch (error) {
        message.channel.send({content:'Cant send message'});
      }
    }
  }
}
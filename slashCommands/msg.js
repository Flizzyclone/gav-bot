module.exports = {
	name: 'msg',
	async execute(interaction, client) {
    await interaction.deferReply();
    let channelId = interaction.options.get("channel").value;
    let channel;
    try {
      channel = await client.channels.fetch(channelId);
    } catch (error) {
      interaction.editReply({content:'Cant find channel'});
      return false;
    }
    try {
      channel.send({content:interaction.options.get("message").value});
      interaction.editReply({content:'Message Sent!'});
    } catch (error) {
      interaction.editReply({content:'Cant send message'});
    }
  }
}
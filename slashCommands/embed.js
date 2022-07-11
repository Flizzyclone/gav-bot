const Discord = require('discord.js');

module.exports = {
	name: 'embed',
	async execute(interaction, client) {
    await interaction.deferReply();
    let embed = new Discord.MessageEmbed;
    embed.title = interaction.options.get("title").value;
    embed.description = interaction.options.get("description").value;
    let channel = await client.channels.fetch(interaction.options.get("channel").value);
    
    var reg=/^#([0-9a-f]{3}){1,2}$/i;
    let color = null;
    if (interaction.options.get("color") != null) {
      color = interaction.options.get("color").value
    }
    if (color != null && reg.test(color) == true) {
      embed.color = color;
    } else if (color != null && !reg.test(color)) {
      interaction.editReply({content:"Invalid Color! Please use a 3 or 6 digit hex code preceded by a #."});
      return;
    }
    await channel.send({embeds:[embed]});
    interaction.editReply({content:"Embed Sent!"})
  }
}
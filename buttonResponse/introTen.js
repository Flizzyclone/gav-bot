const config = require('../config.json');
const messageTools = require('../messageTools');

module.exports = {
	name: 'introTen',
	async execute(interaction, client) {
        let guild = await client.guilds.fetch(config.guildId);
        let approved = interaction.customId.replace("introTen_","");
        let userId = approved.substring((approved.indexOf('_')+1));
        approved = approved.substring(0,approved.indexOf('_'));
        let member = await guild.members.fetch(userId);

        let newEmbed = interaction.message.embeds[0];

        if (approved == 'yes') {
            let general = await client.channels.fetch(config.intro.generalChannel);
            if (!member.roles.cache.has(config.intro.roles.member)) {
                role = await guild.roles.fetch(config.intro.roles.member);
                if (member.manageable) {
                    member.roles.add(role);
                }
            }
            if (member.roles.cache.has(config.intro.roles.newMember)) {
                role = await guild.roles.fetch(config.intro.roles.newMember);
                if (member.manageable) {
                    member.roles.remove(role);
                }
            }
            general.send({content:`Everybody welcome ${member} to the server!`});
            newEmbed.color = "#31974F";
        } else {
            newEmbed.color = "#E93233";
        }
        let newComponents = await messageTools.disableComponents(interaction);
        interaction.update({embeds:[newEmbed],components:newComponents})
    },
}
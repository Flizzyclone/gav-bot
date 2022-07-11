const config = require('../config.json');
const messageTools = require('../messageTools');
const intro = require('../intro');

module.exports = {
	name: 'introNine',
	async execute(interaction, client) {
        let guild = await client.guilds.fetch(config.guildId);
        let member = await guild.members.fetch(interaction.user.id);
        let roleName = interaction.customId.replace("introNine_","");

        if (roleName == 'yes') {
            let roleId = config.intro.roles.alt;
            let role = await guild.roles.fetch(roleId);
            if(member.manageable) {
                member.roles.add(role);
            }
            intro.updateUserValue('altacc',1,interaction.user.id);
        } else {
            intro.updateUserValue('altacc',0,interaction.user.id);
        }

        intro.stageTen(member, client);

        let newComponents = await messageTools.disableComponents(interaction);
        interaction.update({components:newComponents})
    },
}
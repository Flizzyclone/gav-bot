const config = require('../config.json');
const messageTools = require('../messageTools');
const intro = require('../intro');

module.exports = {
	name: 'introEight',
	async execute(interaction, client) {
        let guild = await client.guilds.fetch(config.guildId);
        let member = await guild.members.fetch(interaction.user.id);
        let roleName = interaction.customId.replace("introEight_","");
        if (roleName != "default") {
            let roleId = config.intro.roles.color[roleName];
            let role = await guild.roles.fetch(roleId);
            if(member.manageable) {
                member.roles.add(role);
            }  
            intro.updateUserValue('color',roleId,interaction.user.id);
        }

        intro.stageNine(member);

        let newComponents = await messageTools.disableComponents(interaction);
        interaction.update({components:newComponents})
    },
}
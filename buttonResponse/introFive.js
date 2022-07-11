const config = require('../config.json');
const messageTools = require('../messageTools');
const intro = require('../intro');

module.exports = {
	name: 'introFive',
	async execute(interaction, client) {
        let guild = await client.guilds.fetch(config.guildId);
        let member = await guild.members.fetch(interaction.user.id);
        let roleName = interaction.customId.replace("introFive_","");
        let roleId = config.intro.roles.gender[roleName];
        if (Array.isArray(roleId)) {
            for(i=0; i < roleId.length; i++) {
                let role = await guild.roles.fetch(roleId[i]);
                if(member.manageable) {
                    member.roles.add(role);
                } 
            }
            intro.updateUserValue('gender',roleId.join(),interaction.user.id);
        } else {
            let role = await guild.roles.fetch(roleId);
            if(member.manageable) {
                member.roles.add(role);
            } 
            intro.updateUserValue('gender',roleId,interaction.user.id);
        }

        intro.stageSix(member);

        let newComponents = await messageTools.disableComponents(interaction);
        interaction.update({components:newComponents})
    },
}
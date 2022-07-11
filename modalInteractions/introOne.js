const config = require('../config.json');
const intro = require('../intro');
const prebuiltComponents = require('../prebuiltComponents/intro');

module.exports = {
	name: 'introOne',
	async execute(interaction, client) {
        let guild = await client.guilds.fetch(config.guildId);
        let member = await guild.members.fetch(interaction.user.id);

        const submission = interaction.components[0].components[0].value;

        if(member.manageable) {
            member.setNickname(submission);
        }
        
        intro.updateUserValue('name',submission,interaction.user.id);
        intro.stageTwo(member);
        interaction.update({components:prebuiltComponents.stageOneDisabled});
    }
}
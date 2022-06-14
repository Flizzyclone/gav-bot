module.exports = {
	name: 'dm',
	async execute(interaction, client) {
        await interaction.deferReply();
        let memberId = interaction.options.get("member").value;
        let member = await client.users.fetch(memberId);
        let dm;
        try {
            dm = await member.createDM();
        } catch (error) {
            interaction.editReply({content:'Cant find user'});
            return false;
        }
        try {
            dm.send({content:interaction.options.get("message").value});
            interaction.editReply({content:'Message Sent!'});
        } catch (error) {
            console.error('cant send DM');
            interaction.editReply({content:'Cant send DM'});
        }
    }
}
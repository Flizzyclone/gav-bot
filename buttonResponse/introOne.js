const Discord = require("discord.js");

module.exports = {
	name: 'introOne',
	async execute(interaction, client) {
        let buttonIdString = interaction.customId.replace("introOne_","");
    
        if (buttonIdString == 'nameEnter') {
            const modal = new Discord.Modal()
            .setCustomId(`introOne_nameEnter`)
            .setTitle('Enter Your Name');

            const guessInput = new Discord.TextInputComponent()
			.setCustomId(`complete_nameInput`)
			.setLabel("What is your name?")
			.setStyle("SHORT")
            .setMaxLength(32);

            modal.addComponents([new Discord.MessageActionRow().addComponents([guessInput])]);

            await interaction.showModal(modal);
        }
    },
}
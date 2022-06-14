const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json');

const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
let commands = [];

const rest = new REST({ version: '9' }).setToken(config.token)

const dm = new SlashCommandBuilder()
.setName('dm')
.setDescription('Message a member through Gavin')
.setDMPermission(false)
.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
.addUserOption(option =>
	option
	.setName('member')
	.setDescription('The member to send the message to.')
	.setRequired(true))
.addStringOption(option =>
	option
	.setName('message')
	.setDescription('The message to send.')
	.setRequired(true));
commands.push(dm);

const msg = new SlashCommandBuilder()
.setName('msg')
.setDescription('Send a message in a channel through Gavin')
.setDMPermission(false)
.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
.addChannelOption(option =>
	option
	.setName('channel')
	.setDescription('The channel to send the message in.')
	.setRequired(true))
.addStringOption(option =>
	option
	.setName('message')
	.setDescription('The message to send.')
	.setRequired(true));
commands.push(msg);

(async () => {
  let commandjson = [];
  for (command of commands) {
    commandjson.push(command.toJSON());
  }
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(config.clientId, config.guildId),
			{ body: commandjson },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
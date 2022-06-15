const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json');

const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
let commands = [];

const rest = new REST({ version: '9' }).setToken(config.token)

const demographicsStr = new SlashCommandStringOption()
.setName('category')
.setDescription('The set of labels to get demographics for.')
.setRequired(true)
.addChoices({name:"Age",value:"age"},
{name:"Romantic Orientation",value:"romantic"},
{name:"Sexual Orientation",value:"sexuality"},
{name:"Gender Identity",value:"gender"},
{name:"Preferred Pronouns",value:"pronouns"},
{name:"Region",value:"region"},
{name:"Color",value:"color"})

const demographics = new SlashCommandBuilder()
.setName('demographics')
.setDescription('Get demographic information about the members of this server.')
.addStringOption(demographicsStr)
commands.push(demographics);

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
			Routes.applicationCommands(config.clientId),
			{ body: commandjson },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
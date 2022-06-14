//CORE LIBRARIES
//discord
const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.DIRECT_MESSAGES,Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,Discord.Intents.FLAGS.GUILDS,Discord.Intents.FLAGS.GUILD_INTEGRATIONS,Discord.Intents.FLAGS.GUILD_MEMBERS,Discord.Intents.FLAGS.GUILD_MESSAGES,Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,Discord.Intents.FLAGS.GUILD_WEBHOOKS]});

const fs = require('fs')

const config = require('./config.json');

const suggestions = require('./suggestions');

//Command importing
const textCommandFiles = fs.readdirSync('./textCommands').filter(file => file.endsWith('.js'));

client.textCommands = new Discord.Collection();

for (const file of textCommandFiles) {
    const command = require(`./textCommands/${file}`);
  
	client.textCommands.set(command.name, command);
}

client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (msg) => {
    var args = msg.content.split(" ");
    if (msg.channel.type == 'dm' && msg.author.id !== config.clientId) {
        let GAV = await client.guilds.fetch(config.roles.guildId);
        if (GAV.member(msg.author).roles.cache.has(config.roles.newMember) == false) {
            let date = new Date();
            let datestring = date.toLocaleString('en-GB', { timeZone: 'UTC' });
            content = msg.content;
            if (msg.attachments.array().length > 0) {
                let attachments = msg.attachments.array();
                for (i=0; i < attachments.length; i++) {
                    content = content + '\n' + attachments[i].url.toString();
                } 
            }
            let outputChannel = await client.channels.cache.get(config.dmOutputChannel);
            outputChannel.send({content:`DM From ${msg.author} at ${datestring}:\n${content}`});
        }
    }
    if (args[0] == "?suggest") {
        let settings = JSON.parse(fs.readFileSync('./data/suggestiondata.json'));
        let channel = await client.channels.cache.get(settings.suggestionschannel)
        let returnMsg = await suggestions.newSuggestion(msg, channel);
        msg.channel.send(returnMsg.message);
        returnMsg.suggestionMsg.react(config.suggestions.yesEmote);
        returnMsg.suggestionMsg.react(config.suggestions.neutralEmote);
        returnMsg.suggestionMsg.react(config.suggestions.noEmote);
    } else if (args[0] == "?deletesuggestion") {
        if (args[1] == '0') {
            msg.channel.send({content:'Reserved Suggestion Number.'});
        }
        let settings = JSON.parse(fs.readFileSync('./data/suggestiondata.json'));
        let suggestionChannel = await client.channels.cache.get(settings.suggestionschannel)
        let response = await suggestions.deleteSuggestion(args[1],msg.author.id);
        if (response.status == false) {
            msg.channel.send({content:response.error});
        } else {
            let message = await suggestionChannel.messages.fetch(response.message_id);
            message.delete();
            msg.channel.send({content:`Suggestion #${response.id} deleted. It read ` + '`' + Discord.Util.removeMentions(response.desc) + '`.'});
        }
    } else if (args[0] == "?suggestionchannel") { 
        let settings = JSON.parse(fs.readFileSync('./data/suggestiondata.json'));
        let admin = false;
        try {
            admin = msg.member.permissions.has('ADMINISTRATOR');
        } catch (e) {
            msg.channel.send({content:`Must do this command in server where suggestions is enabled!`});
            return;
        }
        if (admin == true) {
            if (args[1] == null) {
                msg.channel.send({content:'Please send a channel to change suggestions to.'})
            } else {
                let channelid = args[1]
                channelid = channelid.replace('>','');
                channelid = channelid.replace('#','');
                channelid = channelid.replace('<','');
                try {
                    let oldchannel = await client.channels.cache.get(settings.suggestionschannel);
                    starchannel = await client.channels.cache.get(channelid);
                    const webhooks = await oldchannel.fetchWebhooks();
		            const webhook = webhooks.first();
                    await webhook.edit({
                        name:msg.author.username,
                        avatar:msg.author.avatarURL(),
                        channel: channelid
                    });
                    settings.suggestionschannel = channelid;
                    fs.writeFileSync('./data/suggestiondata.json', JSON.stringify(settings));
                    msg.channel.send({content:`Suggestions channel set to ${starchannel.toString()}!`});
                    return;
                } catch(e) {
                    console.error(e);
                    msg.channel.send({content:'`' + e + '`'});
                    return;
                }
            }
        } else {
            msg.channel.send({content:`You are not an admin, you can't do that`});
            return;
        }
        fs.writeFileSync('./data/suggestiondata.json',JSON.stringify(settings));
    } else if (args[0] == '!gav') {
        if (!client.textCommands.has(args[1].toLowerCase())) return;

        try {
          client.textCommands.get(args[1].toLowerCase()).execute(msg, args, client);
        } catch (error) {
          console.error(error);
          console.log('[ERROR] Executing command: ' + args[0]);
        }
    }
});


client.login(config.token); //bot token
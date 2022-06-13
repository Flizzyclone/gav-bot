//CORE LIBRARIES
//discord
const Discord = require("discord.js");
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.DIRECT_MESSAGES,Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,Discord.Intents.FLAGS.GUILDS,Discord.Intents.FLAGS.GUILD_INTEGRATIONS,Discord.Intents.FLAGS.GUILD_MEMBERS,Discord.Intents.FLAGS.GUILD_MESSAGES,Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,Discord.Intents.FLAGS.GUILD_WEBHOOKS]});

const fs = require('fs')

const config = require('./config.json');

const suggestions = require('./suggestions');

bot.on("ready", async () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", async (msg) => {
    var args = msg.content.split(" ");
    if (msg.channel.type == 'dm' && msg.author.id !== config.clientId) {
        let GAV = await bot.guilds.fetch(config.roles.guildId);
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
            let outputChannel = await bot.channels.cache.get(config.dmOutputChannel);
            outputChannel.send({content:`DM From ${msg.author} at ${datestring}:\n${content}`});
        }
    }
    if (args[0] == "?suggest") {
        let settings = JSON.parse(fs.readFileSync('./data/suggestiondata.json'));
        let channel = await bot.channels.cache.get(settings.suggestionschannel)
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
        let suggestionChannel = await bot.channels.cache.get(settings.suggestionschannel)
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
            admin = msg.member.hasPermission('ADMINISTRATOR');
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
                    let oldchannel = await bot.channels.cache.get(settings.suggestionschannel);
                    starchannel = await bot.channels.cache.get(channelid);
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
        if (args[1] == 'dm' && msg.member.hasPermission('MANAGE_MESSAGES')) {
            console.log(msg.content);
            let memid = args[2];
            memid = memid.replace('>','');
            memid = memid.replace('!','');
            memid = memid.replace('<@','');
            let member = bot.users.cache.get(memid);
            let dm;
            try {
                dm = await member.createDM();
              } catch (error) {
                console.error('cant create dm with user');
                msg.channel.send({content:'Cant find user'});
                return false;
            }
            let messagetosend = args;
            messagetosend.splice(0, 3);
            messagetosend = messagetosend.join(' ');
            try {
                dm.send({content:messagetosend});
                msg.channel.send({content:'Message Sent!'});
              } catch (error) {
                console.error('cant send DM');
                msg.channel.send({content:'Cant send DM'});
            }
        }
        if (args[1] == 'msg' && msg.member.hasPermission('MANAGE_MESSAGES')) {
            let memid = args[2];
            memid = memid.replace('>','');
            memid = memid.replace('!','');
            memid = memid.replace('<#','');
            let channel;
            try {
                channel = bot.channels.cache.get(memid);
              } catch (error) {
                console.error('cant create dm with user');
                msg.channel.send({content:'Cant find channel'});
                return false;
            }
            let messagetosend = args;
            messagetosend.splice(0, 3);
            messagetosend = messagetosend.join(' ');
            try {
                channel.send({content:messagetosend});
                msg.channel.send({content:'Message Sent!'});
              } catch (error) {
                console.error('cant send message');
                msg.channel.send({content:'Cant send message'});
            }
        }
    }
});


bot.login(config.token); //bot token
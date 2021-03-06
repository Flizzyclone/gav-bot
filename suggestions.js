const fs = require('fs');
const Discord = require("discord.js");
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('server', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'data/suggestionsdb.sqlite',
});

const suggestionsDB = sequelize.define('suggestionsDB', {
    suggestion_number: {
      type: Sequelize.NUMBER,
      unique: false,
      primaryKey: false,
    },
    user_id: {
      type: Sequelize.STRING,
      unique: false,
    },
    suggestion_desc: {
      type: Sequelize.STRING,
      unique: false,
    },
    message_id: {
        type: Sequelize.STRING,
        unique: true,
    }
},{
    freezeTableName: true
});

suggestionsDB.sync();

async function newSuggestion(msg, channel) {
    try {
        let data = JSON.parse(fs.readFileSync('./data/suggestiondata.json'));
        const webhooks = await channel.fetchWebhooks();
		const webhook = webhooks.first();
        await webhook.edit({
            name:msg.author.username,
            avatar:msg.author.avatarURL()
        });
        let suggestion = msg.content.replace(/[?]suggest /i, '');
        let num = data.numofsuggestions;
        num++;
        let webhookMsg;
        if (msg.attachments.size > 0) {
            if (msg.attachments.at(0).url.substring((msg.attachments.at(0).url.length) - 3) == 'gif') {
                webhookMsg = await webhook.send({
                    embeds: [{
                        description:suggestion,
                        color:'#FFA131',
                        footer:{text: `Suggestion #${num}`},
                        image: {
                            url: 'attachment://file.gif'
                        }
                    }],
                    files: [{
                        attachment: msg.attachments.at(0).url,
                        name: 'file.gif'
                    }]
                });
            } else {
                webhookMsg = await webhook.send({
                    embeds: [{
                        description:suggestion,
                        color:'#FFA131',
                        footer:{text: `Suggestion #${num}`},
                        image: {
                            url: 'attachment://file.jpg'
                        }
                    }],
                    files: [{
                        attachment: attachments[0].url,
                        name: 'file.jpg'
                    }]
                });
            }
        } else {
            webhookMsg = await webhook.send({
                embeds: [{
                    description:suggestion,
                    color:'#FFA131',
                    footer:{text: `Suggestion #${num}`}
                }]
            });
        }
        await suggestionsDB.create({
            suggestion_number: num,
            user_id: msg.author.id,
            suggestion_desc: suggestion,
            message_id: webhookMsg.id
        }); 
        data.numofsuggestions = num;
        fs.writeFileSync('./data/suggestiondata.json',JSON.stringify(data));
        let returnMsg = new Discord.MessageEmbed;
        returnMsg.description = `Your Suggestion has been sent to ${channel} to be voted on.`;
        returnMsg.color = '#31974F';
        returnMsg.setFooter({text:`Use ?deletesuggestion ${num} to delete this suggestion.`});
        return {message: returnMsg, suggestionMsg: webhookMsg};
    } catch(e) {
        console.log(e);
        return('`' + e + '`');
    }
}

async function deleteSuggestion(num, userid) {
    let suggestionEntry;
    suggestionEntry = await suggestionsDB.findOne({ where: { suggestion_number: num }});
    try {
        suggestionEntry = await suggestionsDB.findOne({ where: { suggestion_number: num }});
        if(suggestionEntry == null) {
            return({status: false, error:`Could not find suggestion #${suggestion = Discord.Util.removeMentions(num)}.`});
        }
        if (suggestionEntry.dataValues.user_id == userid) {
            await suggestionsDB.update({ suggestion_number: 0}, { where: { suggestion_number: num }});
            return({status: true, message_id:suggestionEntry.dataValues.message_id, id:suggestionEntry.dataValues.suggestion_number, desc:suggestionEntry.dataValues.suggestion_desc});
        } else {
            return({status: false, error:`You cannot delete a suggestion that you did not make!`});
        }
    } catch(e) {
        console.log(e);
        return({status: false, error:'`' + e + '`'});
    }
}

exports.deleteSuggestion = deleteSuggestion
exports.newSuggestion = newSuggestion
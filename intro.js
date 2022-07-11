//CORE LIBRARIES
//discord
const Discord = require("discord.js");

const config = require('./config.json');

const prebuiltComponents = require('./prebuiltComponents/intro');

//intro DB
const Sequelize = require('sequelize');

const sequelize = new Sequelize('server', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'data/memberdata.sqlite',
});

let memberSettings = sequelize.define('memsettings', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        unique: false
    },
    age: {
        type: Sequelize.STRING,
        unique: false
    },
    sexuality: {
        type: Sequelize.STRING,
        unique: false
    },
    romantic: {
        type: Sequelize.STRING,
        unique: false
    },
    gender: {
        type: Sequelize.STRING,
        unique: false
    },
    pronouns: {
        type: Sequelize.STRING,
        unique: false
    },
    region: {
        type: Sequelize.STRING,
        unique: false
    },
    color: {
        type: Sequelize.STRING,
        unique: false
    },
    altacc: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
});

memberSettings.sync();

//premade embeds
const stageStartEmbed = new Discord.MessageEmbed;
stageStartEmbed.title = 'Welcome to GayAdultsVerified!';
stageStartEmbed.color = '#E93233';
stageStartEmbed.description = 'We require that you go through an introduction process whereby you need to fill out some basic info about yourself and this bot will set you up with roles, change your nickname, and then a moderator will review your introduction and you will gain access to the Discord.';

const stageOneEmbed = new Discord.MessageEmbed;
stageOneEmbed.title = "What is your first name?";
stageOneEmbed.description = "This is used to set your nickname in the Discord.";
stageOneEmbed.color = '#FFA131';

const stageTwoEmbed = new Discord.MessageEmbed;
stageTwoEmbed.title = "How old are you?";
stageTwoEmbed.description = "This is used to give you an age role.";
stageTwoEmbed.color = '#FFF033';

const stageThreeEmbed = new Discord.MessageEmbed;
stageThreeEmbed.title = "What sexuality do you identify as?";
stageThreeEmbed.description = "This is used to give you a sexuality role.";
stageThreeEmbed.color = '#31974F';

const stageFourEmbed = new Discord.MessageEmbed;
stageFourEmbed.title = "What romantic orientation do you identify as?";
stageFourEmbed.description = "This is used to give you a romantic orientation role.";
stageFourEmbed.color = '#316EFF';

const stageFiveEmbed = new Discord.MessageEmbed;
stageFiveEmbed.title = "What gender do you identify as?";
stageFiveEmbed.description = "This is used to give you a gender role.";
stageFiveEmbed.color = '#8F379F';

stageFiveEmbed.setFooter({text:'Transgender Male/Female set both the Transgender role and the Male/Female role.', iconURL:'https://i.imgur.com/xZBXD86.png'});

const stageSixEmbed = new Discord.MessageEmbed;
stageSixEmbed.title = "What are your preferred pronouns?";
stageSixEmbed.description = "This is used to give you a preferred pronoun role. You can select other pronouns later through Roleypoly.";
stageSixEmbed.color = '#E93233';

const stageSevenEmbed = new Discord.MessageEmbed;
stageSevenEmbed.title = "Where do you live?";
stageSevenEmbed.description = "This is used to give you a Region role.";
stageSevenEmbed.color = '#FFA131';

let stateEightEmbed = new Discord.MessageEmbed;
stateEightEmbed.title = 'What color do you want your name to be?';
stateEightEmbed.description = 'Press one of the buttons to get a color role. The squares next to the text are a preview of what the color looks like.';
stateEightEmbed.color = '#FFF033';

const stageNineEmbed = new Discord.MessageEmbed;
stageNineEmbed.title = "Finally, is this your alt account?";
stageNineEmbed.description = "This is used to give you an Alt Account role.";
stageNineEmbed.color = '#31974F';

const stageEndEmbed = new Discord.MessageEmbed;
stageEndEmbed.title = "You're all set!";
stageEndEmbed.description = "A Moderator will look over your introduction soon, and if all looks good you will gain access to the server.";
stageEndEmbed.color = '#316EFF';

async function initiateVerification(member, client) {
    let outputChannel = await client.channels.fetch(config.intro.outputChannel);
    let directmess = await member.createDM();
    try {
        await directmess.send({embeds:[stageStartEmbed]});
    } catch (error) {
        console.log('cant send intro DM');
        console.log(error.message);
        if (error.message == 'Cannot send messages to this user') {
            let manualverifmsg = new Discord.Message
            let channel = client.channels.cache.get('764515162052362269')
            manualverifmsg.content = 'Hey <@!' + member.user.id + "> due to your privacy settings, you are unable to proceed with bot verification. If you would prefer to use bot verification, please turn `Allow direct messages from server members` on in `Privacy & Safety` and then DM `!restart` to <@!722923917756465243>. Otherwise, follow the pinned message for manual verification."
            channel.send({embeds:[manualverifmsg]});
            outputChannel.send({content:`Couldn't send initial verification message to ${msg.author.name} because of their privacy settings.`});
        } else {
            let channel = client.channels.cache.get('764515162052362260');
            channel.send({content:error.message});
            outputChannel.send({content:`Unknown error sending initial DM message to ${msg.author.name}`});
        }
        return;
    }
    stageOne(member);
    console.log(member.user.tag + ' joined, messages sent');
    outputChannel.send({content:`${member.user.tag} joined, messages sent.`});
    try {
        const newmemberSettings = await memberSettings.create({ id: member.user.id });
        console.log(`${newmemberSettings.id} added.`);
    }
    catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            console.log('That member settings already exists.');
        } else {
            outputChannel.send({ content:"Something went wrong with member data."});
            console.log(e);
        }
    }
};

async function stageOne(member) {
    let directmess = await member.createDM();
    await directmess.send({embeds:[stageOneEmbed],components:prebuiltComponents.stageOne});
}

async function stageTwo(member) {
    let directmess = await member.createDM();
    await directmess.send({embeds:[stageTwoEmbed],components:prebuiltComponents.stageTwo});
}

async function stageThree(member) {
    let directmess = await member.createDM();
    await directmess.send({embeds:[stageThreeEmbed],components:prebuiltComponents.stageThree});
}

async function stageFour(member) {
    let directmess = await member.createDM();
    await directmess.send({embeds:[stageFourEmbed],components:prebuiltComponents.stageFour});
}

async function stageFive(member) {
    let directmess = await member.createDM();
    await directmess.send({embeds:[stageFiveEmbed],components:prebuiltComponents.stageFive});
}

async function stageSix(member) {
    let directmess = await member.createDM();
    await directmess.send({embeds:[stageSixEmbed],components:prebuiltComponents.stageSix});
}

async function stageSeven(member) {
    let directmess = await member.createDM();
    await directmess.send({embeds:[stageSevenEmbed],components:prebuiltComponents.stageSeven});
}

async function stageEight(member) {
    let directmess = await member.createDM();
    await directmess.send({embeds:[stateEightEmbed],components:prebuiltComponents.stageEight});
}

async function stageNine(member) {
    let directmess = await member.createDM();
    await directmess.send({embeds:[stageNineEmbed],components:prebuiltComponents.stageNine});
}

async function stageTen(member, client) {
    let guild = await client.guilds.fetch(config.guildId);
    let channel = client.channels.cache.get(config.intro.approvalChannel);
    let directmess = await member.createDM();
    await directmess.send({embeds:[stageEndEmbed]});
    let staffVerifSummary = new Discord.MessageEmbed;

    console.log('fetching user data from DB');
    let userData = await memberSettings.findOne({ where: { id: member.user.id } }); // this happens as late into the process as possible

    let altAcc = userData.dataValues.altacc;
    if (altAcc == 0) {
        altAcc = "False";
    } else {
        altAcc = "True";
    }

    let genderStr = ""
    let genderArr = userData.dataValues.gender.split(",");
    if (Array.isArray(genderArr)) {
        for (let i=0; i < genderArr.length; i++) {
            genderStr += (await guild.roles.fetch(genderArr[i])).name;
        }
    } else {
        genderStr += (await guild.roles.fetch(genderArr)).name;
    }
    console.log(userData);
    console.log(userData.dataValues.age)
    console.log(await guild.roles.fetch(userData.dataValues.age))

    staffVerifSummary.title = ('New Member - ' + userData.dataValues.name + '/' + member.user.tag);
    staffVerifSummary.description = ('Discord Tag: ' + member.user.tag + '\nDiscord ID: ' + userData.dataValues.id + '\nFirst Name: ' + userData.dataValues.name + '\nAge: ' + (await guild.roles.fetch(userData.dataValues.age)).name + '\nSexuality: ' + (await guild.roles.fetch(userData.dataValues.sexuality)).name + '\nRomantic Orientation: ' + (await guild.roles.fetch(userData.dataValues.romantic)).name + '\nGender: ' + genderStr + '\nPronouns:' + (await guild.roles.fetch(userData.dataValues.pronouns)).name + '\nRegion: ' + (await guild.roles.fetch(userData.dataValues.region)).name + '\nAlt Account: ' + altAcc);
    staffVerifSummary.setThumbnail(member.user.avatarURL());

    let staffVerifComponents = [new Discord.MessageActionRow()
        .addComponents([
            new Discord.MessageButton()
                .setCustomId(`introTen_yes_${member.user.id}`)
                .setLabel("Approve")
                .setStyle("SUCCESS"),
            new Discord.MessageButton()
                .setCustomId(`introTen_no_${member.user.id}`)
                .setLabel("Deny")
                .setStyle("DANGER"),
        ])]

    await channel.send({embeds:[staffVerifSummary],components:staffVerifComponents});

    //const filter = (reaction, user) => (reaction.emoji.name === '☑️' || reaction.emoji.name === '❌') && user != client.user.id;
    //message.awaitReactions({filter, max: 1})
    //    .then(collected => {
    //        let reaction = collected.first();
    //        if (reaction.emoji.name == '☑️' ) {
    //            console.log(settings.disctag + ' introduction approved by ' + reaction.client.user.username )
    //            if (member.roles.cache.has('764515161712623652') == false ) {
    //                role = GTV.roles.cache.get('764515161712623652');
    //                member.roles.add(role);
    //            }
    //            if (member.roles.cache.has(config.roles.newMember) == true ) {
    //                role = GTV.roles.cache.get(config.roles.newMember);
    //                member.roles.remove(role);
    //            }
    //            let approvedembed = new Discord.MessageEmbed
    //            approvedembed.title = ('New Member - ' + settings.name + '/' + settings.disctag + ' - ***APPROVED***');
    //            approvedembed.color = '#31974F';
    //            channel.send({embeds:[approvedembed]});
    //            let welcomemsg = new Discord.MessageEmbed;
    //            welcomemsg.color = '#FFF033';
    //            welcomemsg.setDescription(`Everybody welcome ${member} to the server!`);
    //            general.send({embeds:[welcomemsg]});
    //            console.log(settings.name + ' welcome msg sent');
    //        }
    //        if (reaction.emoji.name == '❌' ) {
    //            console.log(settings.name + ' introduction denied');
    //            let deniedembed = new Discord.MessageEmbed;
    //            deniedembed.title = ('New Member - ' + settings.name + '/' + settings.disctag + ' - ***DENIED***');
    //            deniedembed.color = '#E93233';
    //            channel.send({embeds:[deniedembed]});
    //            return;
    //        }
    //    })
}

function updateUserValue(prop,val,id) {
    memberSettings.update({ [prop]: val}, { where: { id: id }});
}

module.exports = {
    initiateVerification,
    updateUserValue,
    stageTwo,
    stageThree,
    stageFour,
    stageFive,
    stageSix,
    stageSeven,
    stageEight,
    stageNine,
    stageTen
}

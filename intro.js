//CORE LIBRARIES
//discord
const Discord = require("discord.js");
const bot = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILD_MEMBERS,Discord.Intents.FLAGS.GUILDS,Discord.Intents.FLAGS.DIRECT_MESSAGES,Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,Discord.Intents.FLAGS.GUILD_MESSAGES,Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

const config = require('./config.json');

const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

let outputChannel;

//intro DB
const Sequelize = require('sequelize');

const sequelize = new Sequelize('server', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'data/memberdata.sqlite',
});

let membersettings = sequelize.define('memsettings', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
    },
    disctag: {
        type: Sequelize.STRING,
        defaultValue: 'None',
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        defaultValue: 'None',
        allowNull: false,
    },
    age: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    sexuality: {
        type: Sequelize.STRING,
        defaultValue: 'None',
        allowNull: false,
    },
    romantic: {
        type: Sequelize.STRING,
        defaultValue: 'None',
        allowNull: false,
    },
    gender: {
        type: Sequelize.STRING,
        defaultValue: 'None',
        allowNull: false,
    },
    region: {
        type: Sequelize.STRING,
        defaultValue: 'None',
        allowNull: false,
    },
    pronouns: {
        type: Sequelize.STRING,
        defaultValue: 'None',
        allowNull: false,
    },
    altacc: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
});

//premade embeds
const verifmsgintro = new Discord.MessageEmbed;
verifmsgintro.title = 'Welcome to GayAdultsVerified!';
verifmsgintro.color = '#E93233';
verifmsgintro.description = 'We require that you go through an introduction process whereby you need to fill out some basic info about yourself and this bot will set you up with roles, change your nickname, and then a moderator will review your introduction and you will gain access to the Discord.';
verifmsgintro.setFooter('If this process breaks at any point, please use !restart', 'https://i.imgur.com/xZBXD86.png');

const verifmsg0 = new Discord.MessageEmbed;
verifmsg0.title = 'To start, Do you have a Reddit account?';
verifmsg0.description = "Please react with Y or N";
verifmsg0.color = '#FFA131';

const verifmsg1 = new Discord.MessageEmbed;
verifmsg1.title = 'Are you verified on the subreddit?';
verifmsg1.description = "Please react with Y or N";
verifmsg1.color = '#FFA131';


const verifmsg2 = new Discord.MessageEmbed;
verifmsg2.title = "What is your reddit username?";
verifmsg2.description = "Accepted Formats: `<username>`,`/u/<username>`,`u/<username>`\n\nYou do not have to be approved to the subreddit to complete verification.";
verifmsg2.color = '#FFF033';

verifmsg2.setFooter('It may be a second until you can send your username, if you send your username and get no response, wait a few seconds and send it again, thanks!', 'https://i.imgur.com/xZBXD86.png');

const verifmsg3 = new Discord.MessageEmbed;
verifmsg3.title = "What is your first name?";
verifmsg3.description = "This is used to set your nickname in the Discord.";
verifmsg3.color = '#31974F';

verifmsg3.setFooter('Nicknames must be less than 32 characters long.', 'https://i.imgur.com/xZBXD86.png');

const verifmsg4 = new Discord.MessageEmbed;
verifmsg4.title = "How old are you?";
verifmsg4.description = "This is used to give you an age role.";
verifmsg4.color = '#316EFF';

const verifmsg5 = new Discord.MessageEmbed;
verifmsg5.title = "What sexuality do you identify as?";
verifmsg5.description = "This is used to give you a sexuality role.\n\n Supported values: `Homosexual, Gay, Bisexual, Bi, Pan, Pansexual, Asexual, Demisexual, Queer, Heterosexual, and Sexuality Questioning`";
verifmsg5.color = '#8F379F';

const verifmsg6 = new Discord.MessageEmbed;
verifmsg6.title = "What romantic orientation do you identify as?";
verifmsg6.description = "This is used to give you a romantic orientation role.\n\n Supported values: `Homoromantic, Gay, Biromantic, Bi,Pan, Panromantic, Aromantic, Demiromatic, Heteroromantic, and Romantically Questioning`";
verifmsg6.color = '#E93233';

const verifmsg7 = new Discord.MessageEmbed;
verifmsg7.title = "What gender do you identify as?";
verifmsg7.description = "This is used to give you a gender role.\n\n Supported values: `Male, Female, Transgender Male, Transgender Female, Non-Binary, Gender Queer, Demigender, and Gender Questioning`";
verifmsg7.color = '#FFA131';

verifmsg7.setFooter('Transgender Male/Female set both the Transgender role and the Male/Female role.', 'https://i.imgur.com/xZBXD86.png');

const verifmsg9 = new Discord.MessageEmbed;
verifmsg9.title = "Where do you live?";
verifmsg9.description = "This is used to give you a Region role.\n\n Supported values: `Europe, North America, South America, Africa, Middle East, Asia, and Oceania`";
verifmsg9.color = '#31974F';

const verifmsg8 = new Discord.MessageEmbed;
verifmsg8.title = "What are your preferred pronouns?";
verifmsg8.description = "This is used to give you a preferred pronoun role.\n\n Supported values: `He/Him, She/Her, They/Them, Other`";
verifmsg8.color = '#FFF033';

const verifmsgalt = new Discord.MessageEmbed;
verifmsgalt.title = "Finally, is this your alt account?";
verifmsgalt.description = "This is used to give you an Alt Account role.";
verifmsgalt.color = '#8F379F';

const verifmsgcomplete = new Discord.MessageEmbed;
verifmsgcomplete.title = "You're all set!";
verifmsgcomplete.description = "A Moderator will look over your introduction soon, and if all looks good you will gain access to the server.";
verifmsgcomplete.color = '#31974F';

const invalidvalue = new Discord.MessageEmbed;
invalidvalue.title = 'Invalid Value';
invalidvalue.color = '#E93233';

const invalidagevalue = new Discord.MessageEmbed;
invalidagevalue.title = 'Invalid Age Value';
invalidagevalue.description = 'You must be between 18 and 26 to join this server.';
invalidagevalue.color = '#E93233';

const toolongnick = new Discord.MessageEmbed;
toolongnick.title = 'Nickname too long' ;
toolongnick.description = 'Discord limits nicknames to 32 characters, please adjust your nickname to be under 32 characters.';
toolongnick.color = '#E93233';

const admincantsetnick = new Discord.MessageEmbed;
admincantsetnick.title = 'Youre an admin, i cant set your nickname';
admincantsetnick.description = "your perms are greater than mine";
admincantsetnick.color = '#E93233';


const msgsentverify = new Discord.MessageEmbed;
msgsentverify.title = 'Verification Message Sent';
msgsentverify.color = '#E93233';

//finally, array construction
const acceptedsexuality = ['HOMOSEXUAL','GAY','BISEXUAL','BI','PAN','PANSEXUAL','ASEXUAL','DEMISEXUAL','QUEER','HETEROSEXUAL','SEXUALITY QUESTIONING']
const acceptedromantic = ['HOMOROMANTIC','GAY','BIROMANTIC','BI','PANROMANTIC','PAN','AROMANTIC','DEMIROMANTIC','HETEROROMANTIC','ROMANTICALLY QUESTIONING']
const acceptedgender = ['MALE','FEMALE','TRANSGENDER MALE','TRANSGENDER FEMALE','NON-BINARY','GENDER QUEER','DEMIGENDER MALE','DEMIGENDER FEMALE','DEMIGENDER NON-BINARY','GENDER QUESTIONING']
const acceptedregion = ['EUROPE','NORTH AMERICA','SOUTH AMERICA','AFRICA','MIDDLE EAST','ASIA','OCEANIA']
const acceptedpronoun = ['HE/HIM','SHE/HER','THEY/THEM']


bot.on("ready", async () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    outputChannel = await bot.channels.cache.get('764515162052362260')
    membersettings.sync();
});

bot.on("message", async (msg) => {
    var args = msg.content.split(" ");
    switch (args[0]) {
        case "!gav":
            if (args[1] == 'svm' && (msg.channel.id == '764515161825345622' || msg.channel.id == '764515162052362260' || msg.channel.id == '764515161825345621' || msg.channel.id == '764515161825345624')) {
                let memtosend = msg.guild.member(msg.mentions.users.first());
                memberverification(memtosend);
                msg.channel.send({embeds:[msgsentverify]});
            }
    }
    switch (args[0]) {
        case "!restart":
            if(msg.channel.type == 'dm') {
                let GTV = bot.guilds.cache.get('764515161712623647');
                memberverification(GTV.member(msg.author));
            }
    }
});

bot.on("guildMemberAdd", async (member) => {
    memberverification(member);
});

async function memberverification(member) {
    await delay(500);
    let directmess = await member.createDM();
    try {
        await directmess.send({embeds:[verifmsgintro]});
    } catch (error) {
        console.log('cant send DM');
        console.log(error.message);
        if (error.message == 'Cannot send messages to this user') {
            let manualverifmsg = new Discord.Message
            let channel = bot.channels.cache.get('764515162052362269')
            manualverifmsg.content = 'Hey <@!' + member.user.id + "> due to your privacy settings, you are unable to proceed with bot verification. If you would prefer to use bot verification, please turn `Allow direct messages from server members` on in `Privacy & Safety` and then DM `!restart` to <@!722923917756465243>. Otherwise, follow the pinned message for manual verification."
            channel.send({embeds:[manualverifmsg]});
            outputChannel.send({content:`Couldn't send initial verification message to ${msg.author.name} because of their privacy settings.`});
        } else {
            let channel = bot.channels.cache.get('764515162052362260');
            channel.send({content:error.message});
            outputChannel.send({content:`Unknown error sending initial DM message to ${msg.author.name}`});
        }
        return;
    }
    introstage3(member);
    console.log(member.user.tag + ' joined, messages sent');
    outputChannel.send({content:`${member.user.tag} joined, messages sent.`});
    try {
        // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
        const newMemberSettings = await membersettings.create({
            id: member.user.id,
            disctag: member.user.tag,
            name: 'None',
            age: 0,
            sexuality: 'None',
            romantic: 'None',
            gender: 'None',
            region: 'None',
            pronouns: 'None',
            altacc: false,
        });
        console.log(`${newMemberSettings.id} added.`);
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

async function introstage3(member) {
    let directmess = await member.createDM();
    await directmess.send({embeds:[verifmsg3]});
    const filter = (msg) => msg.content;
    directmess.awaitMessages({filter, max: 1})
        .then(collected => {
            let name = collected.first();
            name = name.toString();
            if (name.length > 31) {
                directmess.send({embeds:[toolongnick]});
                introstage3(member);
            } else {
                member.setNickname(name, 'automated bot nicknaming');
                introstage4(member);
                membersettings.update({ name: name}, { where: { id: member.user.id }});
            }
        })
}
async function introstage4(member) {
    let GTV = member.guild;
    let directmess = await member.createDM();
    await directmess.send({embeds:[verifmsg4]});
    let role;
    const filter = (msg) => msg.content;
    directmess.awaitMessages({filter, max: 1})
        .then(collected => {
            let value;
            try {
                value = Number(collected.first().content);
            } catch(e) {
                directmess.send({embeds:[invalidvalue]});
                introstage4(member);
            }
            if (value < 18) {
                directmess.send({embeds:[invalidagevalue]});
                introstage4(member);
            }
            if (value >= 18 && value <= 26) {
                membersettings.update({ age: value}, { where: { id: member.user.id }})
                role = GTV.roles.cache.find(role => role.name === (value.toString()));
                member.roles.add(role);
                introstage5(member);
            }
            if (value > 25) {
                directmess.send({embeds:[invalidagevalue]});
                introstage4(member);
            }
            if (value == NaN) {
                directmess.send({embeds:[invalidvalue]});
                introstage4(member);
            }
            if (value == null) {
                directmess.send({embeds:[invalidvalue]});
                introstage4(member);
            }
        })
}

async function introstage5(member) {
    let GTV = member.guild;
    let directmess = await member.createDM();
    await directmess.send({embeds:[verifmsg5]});
    let role;
    const filter = (msg) => msg.content;
    directmess.awaitMessages({filter, max: 1})
        .then(collected => {
            let value = collected.first();
            value = value.toString();
            value = value.toUpperCase();
            if (acceptedsexuality.indexOf(value) == -1) {
                directmess.send({embeds:[invalidvalue]});
                introstage5(member);
            }
            if (acceptedsexuality.indexOf(value) != -1) {
                introstage6(member)
                if (value == 'GAY' || value == 'HOMOSEXUAL') {
                    role = GTV.roles.cache.get('764515161800441871');
                    member.roles.add(role);
                }
                if (value == 'BI' || value == 'BISEXUAL') {
                    role = GTV.roles.cache.get('764515161800441868');
                    member.roles.add(role);
                }
                if (value == 'PAN' || value == 'PANSEXUAL') {
                    role = GTV.roles.cache.get('764515161800441867');
                    member.roles.add(role);
                }
                if (value == 'ASEXUAL') {
                    role = GTV.roles.cache.get('764515161800441870');
                    member.roles.add(role);
                }
                if (value == 'DEMISEXUAL') {
                    role = GTV.roles.cache.get('764515161792446486');
                    member.roles.add(role);
                }
                if (value == 'QUEER') {
                    role = GTV.roles.cache.get('764515161800441866');
                    member.roles.add(role);
                }
                if (value == 'HETEROSEXUAL') {
                    role = GTV.roles.cache.get('764515161792446493');
                    member.roles.add(role);
                }
                if (value == 'SEXUALITY QUESTIONING') {
                    role = GTV.roles.cache.get('764515161800441869');
                    member.roles.add(role);
                }
                membersettings.update({ sexuality: role.name}, { where: { id: member.user.id }});
            }
        })
}

async function introstage6(member) {
    let GTV = member.guild;
    let directmess = await member.createDM();
    await directmess.send({embeds:[verifmsg6]});
    let role;
    const filter = (msg) => msg.content;
    directmess.awaitMessages({filter, max: 1})
        .then(collected => {
            let value = collected.first();
            value = value.toString();
            value = value.toUpperCase();
            if (acceptedromantic.indexOf(value) == -1) {
                directmess.send({embeds:[invalidvalue]});
                introstage6(member);
            }
            if (acceptedromantic.indexOf(value) != -1) {
                introstage7(member)
                if (value == 'GAY' || value == 'HOMOROMANTIC') {
                    role = GTV.roles.cache.get('764515161792446492');
                    member.roles.add(role);
                }
                if (value == 'BI' || value == 'BIROMANTIC') {
                    role = GTV.roles.cache.get('764515161792446489');
                    member.roles.add(role);
                }
                if (value == 'PAN' || value == 'PANROMANTIC') {
                    role = GTV.roles.cache.get('764515161792446488');
                    member.roles.add(role);
                }
                if (value == 'AROMANTIC') {
                    role = GTV.roles.cache.get('764515161792446491');
                    member.roles.add(role);
                }
                if (value == 'DEMIROMANTIC') {
                    role = GTV.roles.cache.get('764515161792446485');
                    member.roles.add(role);
                }
                if (value == 'HETEROROMANTIC') {
                    role = GTV.roles.cache.get('764515161792446487');
                    member.roles.add(role);
                }
                if (value == 'ROMANTICALLY QUESTIONING') {
                    role = GTV.roles.cache.get('764515161792446490');
                    member.roles.add(role);
                }
                membersettings.update({ romantic: role.name}, { where: { id: member.user.id }});
            }
        })
}

async function introstage7(member) {
    let GTV = member.guild;
    let directmess = await member.createDM();
    await directmess.send({embeds:[verifmsg7]});
    let role;
    const filter = (msg) => msg.content;
    directmess.awaitMessages({filter, max: 1})
        .then(collected => {
            let value = collected.first();
            value = value.toString();
            value = value.toUpperCase();
            if (acceptedgender.indexOf(value) == -1) {
                directmess.send({embeds:[invalidvalue]});
                introstage7(member);
            }
            if (acceptedgender.indexOf(value) != -1) {
                introstage8(member);
                if (value == 'MALE') {
                    role = GTV.roles.cache.get('764515161779208260');
                    member.roles.add(role);
                }
                if (value == 'FEMALE') {
                    role = GTV.roles.cache.get('764515161779208259');
                    member.roles.add(role);
                }
                if (value == 'TRANSGENDER MALE') {
                    role = GTV.roles.cache.get('764515161779208261');
                    member.roles.add(role);
                    role = GTV.roles.cache.get('764515161779208260');
                    member.roles.add(role);
                }
                if (value == 'TRANSGENDER FEMALE') {
                    role = GTV.roles.cache.get('764515161779208261');
                    member.roles.add(role);
                    role = GTV.roles.cache.get('764515161779208259');
                    member.roles.add(role);
                }
                if (value == 'NON-BINARY') {
                    role = GTV.roles.cache.get('764515161779208258');
                    member.roles.add(role);
                }
                if (value == 'DEMIGENDER MALE') {
                    role = GTV.roles.cache.get('764515161792446484');
                    member.roles.add(role);
                    role = GTV.roles.cache.get('764515161779208260');
                    member.roles.add(role);
                }
                if (value == 'DEMIGENDER FEMALE') {
                    role = GTV.roles.cache.get('764515161792446484');
                    member.roles.add(role);
                    role = GTV.roles.cache.get('764515161779208259');
                    member.roles.add(role);
                }
                if (value == 'DEMIGENDER NON-BINARY') {
                    role = GTV.roles.cache.get('764515161792446484');
                    member.roles.add(role);
                    role = GTV.roles.cache.get('764515161779208258');
                    member.roles.add(role);
                }
                if (value == 'GENDER QUEER') {
                    role = GTV.roles.cache.get('764515161779208257');
                    member.roles.add(role);
                }
                if (value == 'GENDER QUESTIONING') {
                    role = GTV.roles.cache.get('764515161779208256');
                    member.roles.add(role);
                }
                membersettings.update({ gender: role.name}, { where: { id: member.user.id }});
            }
        })
}

async function introstage8(member) {
    let GTV = member.guild;
    let directmess = await member.createDM();
    await directmess.send({embeds:[verifmsg8]});
    let role;
    const filter = (msg) => msg.content;
    directmess.awaitMessages({filter, max: 1})
        .then(collected => {
            let value = collected.first();
            value = value.toString();
            value = value.toUpperCase();
            if (acceptedpronoun.indexOf(value) == -1) {
                directmess.send({embeds:[invalidvalue]});
                introstage8(member);
            }
            if (acceptedpronoun.indexOf(value) != -1) {
                introstage9(member);
                if (value == 'HE/HIM') {
                    role = GTV.roles.cache.get('764515161776062470');
                    member.roles.add(role);
                }
                if (value == 'SHE/HER') {
                    role = GTV.roles.cache.get('764515161776062469');
                    member.roles.add(role);
                }
                if (value == 'THEY/THEM') {
                    role = GTV.roles.cache.get('764515161776062468');
                    member.roles.add(role);
                }
                if (value == 'OTHER') {
                    role = GTV.roles.cache.get('764515161776062467');
                    members.roles.add(role);
                }
                membersettings.update({ pronouns: role.name}, { where: { id: member.user.id }});
            }
        })
}

async function introstage9(member) {
    let GTV = member.guild;
    let directmess = await member.createDM();
    await directmess.send({embeds:[verifmsg9]});
    let role;
    const filter = (msg) => msg.content;
    directmess.awaitMessages({filter, max: 1})
        .then(collected => {
            let value = collected.first();
            value = value.toString();
            value = value.toUpperCase();
            if (acceptedregion.indexOf(value) == -1) {
                directmess.send({embeds:[invalidvalue]});
                introstage9(member);
            }
            if (acceptedregion.indexOf(value) != -1) {
                introstage10(member)
                if (value == 'EUROPE') {
                    role = GTV.roles.cache.get('764515161776062466');
                    member.roles.add(role);
                }
                if (value == 'NORTH AMERICA') {
                    role = GTV.roles.cache.get('764515161776062465');
                    member.roles.add(role);
                }
                if (value == 'SOUTH AMERICA') {
                    role = GTV.roles.cache.get('764515161776062464');
                    member.roles.add(role);
                }
                if (value == 'AFRICA') {
                    role = GTV.roles.cache.get('764515161762562077');
                    member.roles.add(role);
                }
                if (value == 'MIDDLE EAST') {
                    role = GTV.roles.cache.get('764515161762562076');
                    member.roles.add(role);
                }
                if (value == 'ASIA') {
                    role = GTV.roles.cache.get('764515161762562075');
                    member.roles.add(role);
                }
                if (value == 'OCEANIA') {
                    role = GTV.roles.cache.get('764515161762562074');
                    member.roles.add(role);
                }
                membersettings.update({ region: role.name}, { where: { id: member.user.id }})
            }
        })
}

async function introstage10(member) {
    let GTV = member.guild;
    let directmess = await member.createDM();
    let message = new Discord.MessageEmbed;
    message.title = 'What color do you want your name to be?';
    message.description = 'React with one of the color boxes to change your name in the server to that color.\n\nGray at the end is Default';
    message.color = '#316EFF';
    let messagesent = await directmess.send({embeds:[message]});
    //gradient/good order
    //deep purple
    messagesent.react('765292955031306281');
    // hot pink
    messagesent.react('765292954910457868');
    //lavender
    messagesent.react('765292954775584800');
    //lavender tea
    messagesent.react('765292954872709161');
    //pretty in pink
    messagesent.react('765292955052933132');
    //pastel violet
    messagesent.react('765292955258191882');
    //sky blue
    messagesent.react('765292955345879060');
    //ocean blue 
    messagesent.react('765292955320844378');
    //tiffany blue
    messagesent.react('765292955363049482');
    //aquamarine
    messagesent.react('765292955216117781');
    //cyan
    messagesent.react('765292955031961604');
    //forest green
    messagesent.react('765292955153465345');
    //honey
    messagesent.react('765292955119779880');
    //flame orange
    messagesent.react('765292955099332688');
    //mahogany
    messagesent.react('765292957678698526');
    //dark red
    messagesent.react('765292955040350258');
    //none
    messagesent.react('765292955266973696');
    const filter = (reaction, user) => user == member.user.id;
    messagesent.awaitReactions({filter, max: 1})
    .then(collected => {
        introstage11(member);
        let reaction = collected.first();
        //deep purple
        if (reaction.emoji.id == '765292955031306281' ) {
            role = GTV.roles.cache.get('764515161821544450');
            member.roles.add(role);
        }
        //hot pink
        if (reaction.emoji.id == '765292954910457868' ) {
            role = GTV.roles.cache.get('764515161821544449');
            member.roles.add(role);
        }
        //lavender
        if (reaction.emoji.id == '765292954775584800' ) {
            role = GTV.roles.cache.get('764515161821544448');
            member.roles.add(role);
        }
        //lavendertea
        if (reaction.emoji.id == '765292954872709161' ) {
            role = GTV.roles.cache.get('764515161809485873');
            member.roles.add(role);
        }
        //prettyinpink
        if (reaction.emoji.id == '765292955052933132' ) {
            role = GTV.roles.cache.get('764515161809485872');
            member.roles.add(role);
        }
        //pastelviolet
        if (reaction.emoji.id == '765292955258191882' ) {
            role = GTV.roles.cache.get('764515161809485871');
            member.roles.add(role);
        }             
        //skyblue
        if (reaction.emoji.id == '765292955345879060' ) {
            role = GTV.roles.cache.get('764515161809485870');
            member.roles.add(role);
        }        
        //oceanblue
        if (reaction.emoji.id == '765292955320844378' ) {
            role = GTV.roles.cache.get('764515161809485869');
            member.roles.add(role);
        }        
        //tiffanyblue
        if (reaction.emoji.id == '765292955363049482' ) {
            role = GTV.roles.cache.get('764515161809485868');
            member.roles.add(role);
        }        
        //aquamarine
        if (reaction.emoji.id == '765292955216117781' ) {
            role = GTV.roles.cache.get('764515161809485867');
            member.roles.add(role);
        }
        //cyan
        if (reaction.emoji.id == '765292955031961604' ) {
            role = GTV.roles.cache.get('764515161809485866');
            member.roles.add(role);
        }
        //forestgreen
        if (reaction.emoji.id == '765292955153465345' ) {
            role = GTV.roles.cache.get('764515161809485865');
            member.roles.add(role);
        }
        //honey
        if (reaction.emoji.id == '765292955119779880' ) {
            role = GTV.roles.cache.get('764515161809485864');
            member.roles.add(role);
        }
        //flameorange
        if (reaction.emoji.id == '765292955099332688' ) {
            role = GTV.roles.cache.get('764515161800441875');
            member.roles.add(role);
        }
        //mahogany
        if (reaction.emoji.id == '765292957678698526' ) {
            role = GTV.roles.cache.get('764515161800441874');
            member.roles.add(role);
        }
        //deep red
        if (reaction.emoji.id == '765292955040350258' ) {
            role = GTV.roles.cache.get('764515161800441873');
            member.roles.add(role);
        }
    })
}

async function introstage11(member) {
    let GTV = member.guild;
    let directmess = await member.createDM();
    let message = await directmess.send({embeds:[verifmsgalt]});
    let role;
    const filter = (reaction, user) => (reaction.emoji.name === '🇳' || reaction.emoji.name === '🇾') && user == member.user.id;
    message.react("🇾");
    await message.react('🇳');
    message.awaitReactions({filter, max: 1})
        .then(collected => {
            let reaction = collected.first();
            if (reaction.emoji.name == '🇾' ) {
                introstage12(member);
                role = GTV.roles.cache.get('764515161712623654');
                member.roles.add(role);
                membersettings.update({ altacc: true}, { where: { id: member.user.id }});
            }
            if (reaction.emoji.name == '🇳' ) {
                introstage12(member);
                membersettings.update({ altacc: false}, { where: { id: member.user.id }});
            }
        })
}

async function introstage12(member) {
    let GTV = member.guild;
    let role;
    let channel = bot.channels.cache.get('764515162052362268');
    let general = bot.channels.cache.get('764515162207944741');
    let directmess = await member.createDM();
    await directmess.send({embeds:[verifmsgcomplete]});
    let finishedverif = new Discord.MessageEmbed;
    //import sheet
    console.log('fetching user data from DB');
    let settings = await membersettings.findOne({ where: { id: member.user.id } }); // this happens as late into the process as possible
    finishedverif.title = ('New Member - ' + settings.name + '/' + settings.disctag);
    finishedverif.description = ('Discord Tag: ' + settings.disctag + '\nDiscord ID: ' + settings.id + '\nFirst Name: ' + settings.name + '\nAge: ' + settings.age + '\nSexuality: ' + settings.sexuality + '\nRomantic Orientation: ' + settings.romantic + '\nGender: ' + settings.gender + '\nPronouns:' + settings.pronouns + '\nRegion: ' + settings.region + '\nAlt Account: ' + settings.altacc + '\n\nReact with ☑️ to approve this member, react with ❌ to deny this member.');

    let message = await channel.send({embeds:[finishedverif]});

    message.react('☑️');
    await message.react('❌');

    const filter = (reaction, user) => (reaction.emoji.name === '☑️' || reaction.emoji.name === '❌') && user != bot.user.id;
    message.awaitReactions({filter, max: 1})
        .then(collected => {
            let reaction = collected.first();
            if (reaction.emoji.name == '☑️' ) {
                console.log(settings.disctag + ' introduction approved by ' + reaction.client.user.username )
                if (member.roles.cache.has('764515161712623652') == false ) {
                    role = GTV.roles.cache.get('764515161712623652');
                    member.roles.add(role);
                }
                if (member.roles.cache.has(config.roles.newMember) == true ) {
                    role = GTV.roles.cache.get(config.roles.newMember);
                    member.roles.remove(role);
                }
                let approvedembed = new Discord.MessageEmbed
                approvedembed.title = ('New Member - ' + settings.name + '/' + settings.disctag + ' - ***APPROVED***');
                approvedembed.color = '#31974F';
                channel.send({embeds:[approvedembed]});
                let welcomemsg = new Discord.MessageEmbed;
                welcomemsg.color = '#FFF033';
                welcomemsg.setDescription(`Everybody welcome ${member} to the server!`);
                general.send({embeds:[welcomemsg]});
                console.log(settings.name + ' welcome msg sent');
            }
            if (reaction.emoji.name == '❌' ) {
                console.log(settings.name + ' introduction denied');
                let deniedembed = new Discord.MessageEmbed;
                deniedembed.title = ('New Member - ' + settings.name + '/' + settings.disctag + ' - ***DENIED***');
                deniedembed.color = '#E93233';
                channel.send({embeds:[deniedembed]});
                return;
            }
        })
}


bot.login(config.token);
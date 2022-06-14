module.exports = {
	name: 'dm',
	async execute(message, args, client) {
        if (message.member.permissions.has('MANAGE_MESSAGES')) {

        }
        let memberId = args[2];
        memberId = memberId.replace('>','');
        memberId = memberId.replace('!','');
        memberId = memberId.replace('<@','');
        let member = await client.users.fetch(memberId);
        let dm;
        try {
            dm = await member.createDM();
        } catch (error) {
            message.channel.send({content:'Cant find user'});
            return false;
        }
        let messageToSend = args;
        messageToSend.splice(0, 3);
        messageToSend = messageToSend.join(' ');
        try {
            dm.send({content:messageToSend});
            message.channel.send({content:'Message Sent!'});
        } catch (error) {
            console.error('cant send DM');
            message.channel.send({content:'Cant send DM'});
        }
    }
}
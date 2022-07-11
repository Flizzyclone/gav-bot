
async function disableComponents(interaction) {
    let newMsg = interaction.message.components;
    for(let i=0; i < newMsg.length; i++) {
        for(let j=0; j < newMsg[i].components.length; j++) {
            if (newMsg[i].components[j].customId != interaction.customId) {
                newMsg[i].components[j].setStyle("SECONDARY");
            }
            newMsg[i].components[j].setDisabled(true);
        }
    }
    return newMsg;
}

module.exports = {
    disableComponents
};
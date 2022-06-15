const { MessageAttachment } = require('discord.js');
const config = require('../config.json');
const { ChartJSNodeCanvas  } = require('chartjs-node-canvas');
const canvasRenderService = new ChartJSNodeCanvas({width: 1200, height: 1200});

module.exports = {
	name: 'demographics',
	async execute(interaction, client) {
        await interaction.deferReply();
        let guild = await client.guilds.fetch(config.guildId);
        await guild.members.fetch();
        let configRoles = config.demographics[interaction.options.get("category").value];
        let roles = await getRoles(configRoles,guild);
        let memberCount = await getTotalMembers(configRoles,roles);
        let roleLabels = await rolesToLabelsArray(configRoles);
        let roleData = await rolesToMemberArray(roles);
        let roleColors = await getRoleColors(configRoles,roles);
        let embedDesc = await makeDescription(roleLabels, roleData, memberCount);
        let embedTitle = `${guild.name} Demographics - ${(interaction.options.get("category").value).substring(0,1).toUpperCase() + (interaction.options.get("category").value).substring(1)}`;
        let pieChart = await makePie(roleData, roleColors, roleLabels);
        let pieAttachment = new MessageAttachment(pieChart);
        await interaction.editReply({
            files:[pieAttachment]
        }).then((attachmentReply) => { 
            interaction.editReply({embeds:[{
                title:embedTitle,
                description: embedDesc,
                thumbnail:{
                    url:attachmentReply.attachments.first().url
                }
            }],
            files:[]
            })
        });
    }
}

async function getRoles(configRoles, guild) {
    let roles = [];
    for(i=0; i < configRoles.length; i++) {
        roles.push(await guild.roles.cache.get(configRoles[i].id));
    }
    return roles;
}

async function getTotalMembers(configRoles, roles) {
    let count = 0;
    for(i=0; i < roles.length; i++) {
        if (!configRoles[i].dontCount) {
            count += roles[i].members.size;
        }
    }
    return count;
}

async function rolesToLabelsArray(configRoles) {
    let arr = [];
    for(i=0; i < configRoles.length; i++) {
        arr.push(configRoles[i].label);
    }
    return arr;
}

async function rolesToMemberArray(roles) {
    let arr = [];
    for(i=0; i < roles.length; i++) {
        arr.push(roles[i].members.size);
    }
    return arr;
}

async function getRoleColors(configRoles, roles) {
    let arr = [];
    for(i=0; i < configRoles.length; i++) {
        if (configRoles[i].dontUseRoleColor) {
            arr.push(configRoles[i].color);
        } else {
            arr.push(roles.at(i).hexColor);
        }
    }
    return arr;
}

async function makeDescription(roleNames, membersPerRole, members) {
    let description = "";
    for(i=0; i < roleNames.length; i++) {
        description += `\n${roleNames[i]} - ${membersPerRole[i]} - ${((membersPerRole[i]/members * 100).toFixed(2))}%`;
    }
    return description;
}

async function makePie(piedata, piecolors, pielabels) {
    let image;
    let configuration = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: piedata,
                backgroundColor: piecolors, 
                borderWidth: 0,
            }],
            labels: pielabels
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: 30,
                        },
                        color:'#FFFFFF'
                    }
                }  
            }
        }
    };

    image = await canvasRenderService.renderToStream(configuration);
    return image;
}
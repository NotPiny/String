const fs = require('fs');
const client = require('../client.js');
const config = require('../config.json');
const path = require('path');

client.on('interactionCreate', async (interaction) => {
    fs.appendFileSync(`${path.resolve(`./logs/interactions.log`)}`, `[${interaction.createdAt}, ${interaction.createdTimestamp}] ${interaction.user.tag} (${interaction.user.id}) in #${interaction.channel.name} (${interaction.channel.id}): ${interaction.commandName}\n`);
    fs.appendFileSync(`${path.resolve(`./logs/interactions.raw`)}`, `
    Command Name: ${interaction.commandName}
    ID: ${interaction.id}
    Created At: ${interaction.createdAt}
    Created Timestamp: ${interaction.createdTimestamp}
    Channel: ${interaction.channel.name} (${interaction.channel.id})
    Guild: ${interaction.guild.name} (${interaction.guild.id})
    User: ${interaction.user.tag} (${interaction.user.id})
    Member: {
        Joined At: ${interaction.member.joinedAt}
        Permissions: ${interaction.member.permissions}
        Roles: ${interaction.member.roles}
        User: ${interaction.member.user}
        Nickname: ${interaction.member.nickname}
        Pending: ${interaction.member.pending}
    }
    User: {
        Avatar: ${interaction.user.avatar}
        Bot: ${interaction.user.bot}
        Created At: ${interaction.user.createdAt}
        Discriminator: ${interaction.user.discriminator}
        Flags: ${interaction.user.flags}
        ID: ${interaction.user.id}
    }
    Is Command: ${interaction.isCommand()}
    Is Message Component: ${interaction.isMessageComponent()}
    Is Select Menu: ${interaction.isSelectMenu()}
    Is Button: ${interaction.isButton()}\n
    `);
});
const fs = require('fs');
const path = require('path');
const client = require('../client.js');
const config = require('../config.json');

client.on('messageCreate', async (message) => {
    fs.appendFileSync(`${path.resolve(`./logs/messages.log`)}`, `[${message.createdAt}, ${message.channel.name}] ${message.author.tag} (${message.author.id}): ${message.content}\n`);
    fs.appendFileSync(`${path.resolve(`./logs/messages.raw`)}`, `
    Author: ${message.author.tag} (${message.author.id})
    Channel: ${message.channel.name} (${message.channel.id})
    Guild: ${message.guild.name} (${message.guild.id})
    Content: ${message.content}
    Attachments: ${message.attachments.toJSON()}
    Embeds: ${message.embeds}
    Bot: ${message.author.bot}
    Created At: ${message.createdAt}
    Pinned: ${message.pinned}
    System: ${message.system}
    TTS: ${message.tts}
    Type: ${message.type}
    URL: ${message.url}
    Member: {
        Joined At: ${message.member.joinedAt}
        Permissions: ${message.member.permissions}
        Roles: ${message.member.roles}
        User: ${message.member.user}
        Nickname: ${message.member.nickname}
        Pending: ${message.member.pending}
    }
    User: {
        Avatar: ${message.author.avatar}
        Bot: ${message.author.bot}
        Created At: ${message.author.createdAt}
        Discriminator: ${message.author.discriminator}
        Flags: ${message.author.flags}
        ID: ${message.author.id}
    }\n
    `);
});
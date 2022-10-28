const client = require('../../client.js');
const config = require('../../config.json');

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    
    const command = interaction.commandName;

    function reply(message) {
        interaction.reply({
            content: message,
            ephemeral: true
        });
    }
    
    if (command === 'punish') {
        // Check if the user has the staff role
        if (!interaction.member.roles.cache.has(config.roles.staff)) {
            reply('You do not have permission to use this command');
            return;
        }
        const subCommand = interaction.options.getSubcommand();
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);
        const duration = interaction.options.getInteger('duration');
        const reason = interaction.options.getString('reason');
        const logChannel = interaction.guild.channels.cache.get(config.channels.logs);
        
        if (interaction.options.getSubcommandGroup() === 'mute') {
            if (subCommand === 'add') {
                member.roles.add(config.roles.muted);
                reply(`Muted ${user.tag}`);
                logChannel.send({
                    content: `<@${user.id}> was muted by <@${interaction.user.id}> for ${reason}`,
                    allowedMentions: []
                });
            } else if (subCommand === 'remove') {
                member.roles.remove(config.roles.muted);
                reply(`Unmuted ${user.tag}`);
                logChannel.send({
                    content: `<@${user.id}> was unmuted by <@${interaction.user.id}>`,
                    allowedMentions: []
                });
            }
        } else if (subCommand === 'timeout') {
            if (reason == null) {
                member.timeout(duration * 60);
                reply(`Timed out ${user.tag} for ${duration} minutes`);
                logChannel.send({
                    content: `<@${user.id}> was timed out by <@${interaction.user.id}> for ${duration} minutes for a reason not specified`,
                    allowedMentions: []
                });
            } else {
                member.timeout(duration * 60, reason);
                reply(`Timed out ${user.tag} for ${duration} minutes for ${reason}`);
                logChannel.send({
                    content: `<@${user.id}> was timed out by <@${interaction.user.id}> for ${duration} minutes for ${reason}`,
                    allowedMentions: []
                });
            }
        } else if (subCommand === 'ban') {
            if (reason == null) {
                member.ban({
                    duration: duration,
                    reason: 'No reason provided'
                });
                reply(`Banned ${user.tag} for ${duration} days`);
                logChannel.send({
                    content: `<@${user.id}> was banned by <@${interaction.user.id}> for ${duration} days for a reason not specified`,
                    allowedMentions: []
                });
            } else {
                member.ban({
                    duration: duration,
                    reason: reason
                });
                reply(`Banned ${user.tag} for ${duration} days for ${reason}`);
                logChannel.send({
                    content: `<@${user.id}> was banned by <@${interaction.user.id}> for ${duration} days for ${reason}`,
                    allowedMentions: []
                });
            }
        } else if (subCommand === 'kick') {
            if (reason == null) {
                member.kick('No reason provided');
                reply(`Kicked ${user.tag}`);
                logChannel.send({
                    content: `<@${user.id}> was kicked by <@${interaction.user.id}> for a reason not specified`,
                    allowedMentions: []
                });
            } else {
                member.kick(reason);
                reply(`Kicked ${user.tag} for ${reason}`);
                logChannel.send({
                    content: `<@${user.id}> was kicked by <@${interaction.user.id}> for ${reason}`,
                    allowedMentions: []
                });
            }
        }
    }
})
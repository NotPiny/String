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
        
        if (interaction.options.getSubcommandGroup() === 'mute') {
            if (subCommand === 'add') {
                member.roles.add(config.roles.muted);
                reply(`Muted ${user.tag}`);
            } else if (subCommand === 'remove') {
                member.roles.remove(config.roles.muted);
                reply(`Unmuted ${user.tag}`);
            }
        } else if (subCommand === 'timeout') {
            if (reason == null) {
                member.timeout(duration * 60);
                reply(`Timed out ${user.tag} for ${duration} minutes`);
            } else {
                member.timeout(duration * 60, reason);
                reply(`Timed out ${user.tag} for ${duration} minutes for ${reason}`);
            }
        } else if (subCommand === 'ban') {
            if (reason == null) {
                member.ban({
                    duration: duration,
                    reason: 'No reason provided'
                });
                reply(`Banned ${user.tag} for ${duration} days`);
            } else {
                member.ban({
                    duration: duration,
                    reason: reason
                });
                reply(`Banned ${user.tag} for ${duration} days for ${reason}`);
            }
        } else if (subCommand === 'kick') {
            if (reason == null) {
                member.kick('No reason provided');
                reply(`Kicked ${user.tag}`);
            } else {
                member.kick(reason);
                reply(`Kicked ${user.tag} for ${reason}`);
            }
        }
    }
})
const client = require('../../client.js');

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName == 'ping') {
        await interaction.reply('Pong!');
    }
});
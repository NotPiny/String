const client = require('../../client.js');
const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
    if (interaction.commandName == 'suggest') {
        const modal = new ModalBuilder()
            .setTitle('Suggest something!')
            .setCustomId('suggest')

            const TextInput = new TextInputBuilder()
			.setCustomId('suggestText')
            .setRequired(true)
            .setPlaceholder('Type your suggestion here!')
			.setLabel('Suggestion: ')
			.setStyle(TextInputStyle.Paragraph);

            const row = new ActionRowBuilder()
            .addComponents(TextInput);

            modal.addComponents(row);

            await interaction.showModal(modal);
    }
} else if (interaction.isModalSubmit()) {
    if (interaction.customId == 'suggest') {
        const text = interaction.fields.getTextInputValue('suggestText');
        const channel = client.channels.cache.get('1035555874795687999');
        channel.send(`Suggestion from <@${interaction.user.id}>:\n\`\`\`\n${text}\n\`\`\``);
        interaction.reply({ content: 'Your suggestion has been sent!', ephemeral: true });
    }
}
});
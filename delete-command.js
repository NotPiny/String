const config = require('./config.json');
const id = '1035574433814937700';
const client = require('./client');

const server = client.guilds.cache.get(config.testServer);
const commands = server?.commands;

if (commands) {
    commands.fetch(id)
        .then(command => command.delete())
        .catch(console.error);
}
const { Client, GatewayIntentBits, PermissionsBitField, ApplicationCommandPermissionType } = require('discord.js');
require('dotenv/config');
require('./events/load.js');
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands/build/');
const config = require('./config.json')

const client = require('./client.js');

client.on('ready', () => {
  console.log('Load > Bot loaded');
  const testServer = client.guilds.cache.get(config.testServer);
  const commands = testServer?.commands;

  setInterval(() => {
    const status = config.arrays.status[Math.floor(Math.random() * config.arrays.status.length)];
    client.user.setActivity({
      name: status
    })
  }, 1000 * 15);

  commandFiles.forEach(file => {
    const commandName = file.replace(/.js/, '').toLowerCase();
    if (commandName == 'command.template') return;
    const commandDescription = require(`./commands/build/${file}`).description;
    const commandOptions = require(`./commands/build/${file}`).options;
    if (!fs.readFileSync('./commands.list').toString().includes(commandName)) {
      if (require(`./commands/build/${file}`).testOnly == true) {
        testServer?.commands?.create({
          name: commandName,
          description: commandDescription,
          options: commandOptions,
        })
        .then(() => {
          console.log(`Commands > Created / Updated test command "${commandName}"`);
        })
        .catch(() => { console.log(`Failed to create test command "${commandName}"`); });
      } else {
          commands?.create({
            name: commandName,
            description: commandDescription,
            options: commandOptions
          })
          .then(() => {
            console.log(`Commands > Created command "${commandName}"`);
            fs.appendFileSync('./commands.list', `\n${commandName}`);
          })
          .catch(() => { console.log(`Failed to create command "${commandName}"`); });
      }
    } else {
      if (require(`./commands/build/${commandName}.js`).autoUpdate == true) {
        commands?.create({
          name: commandName,
          description: commandDescription,
          options: commandOptions
        })
        .then(() => {
          console.log(`Sent request to discord to update command "${commandName}"`)
        })
        .catch(() => {
          console.log(`Something went wrong updating "${commandName}"`)
        })
      }
    }
  })
})

require('./commands/exec.js');

client.login(process.env.TOKEN)
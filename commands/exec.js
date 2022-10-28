const fs = require('fs');
const { Client, GatewayIntentBits, PermissionsBitField, ApplicationCommandPermissionType } = require('discord.js');

require('./exec/ping');
require('./exec/suggest');
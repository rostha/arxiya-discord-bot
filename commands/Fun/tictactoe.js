const {Client,   Message, MessageEmbed} = require('discord.js');
const simplydjs = require("simply-djs")
module.exports = {
    name: 'tictactoe',
    description: `Sends a tictactoe game to play`,
    UserPerms: [],
    aliases: ["ttt"],
usage: 'tictactoe @user',
cooldown: 7,
category: 'Fun',
BotPerms: [],
        run: async (client, message, args, Discord) => {
try{
            simplydjs.tictactoe(message)
}catch{}
    }
}

const {Client,   Message, MessageEmbed} = require('discord.js');
const Memer = require("random-jokes-api");
module.exports = {
    name: 'quote',
    description: `Sends a quote`,
    UserPerms: [],
    aliases: ["qte"],
usage: '>quote',
cooldown: 2,
category: 'fun',
BotPerms: ["EMBED_LINKS"],
        run: async (client, message, args, Discord) => {
            try{
            let quotes = Memer.quotes()
            const quoteembed = new MessageEmbed()
            .setColor(client.y.y)
            .setFooter(`Quote for ${message.author.username}  • ${client.user.username}`)
            .setTimestamp()
            .setAuthor(`${message.author.displayName || `${message.author.username}`}`,message.author.avatarURL({dynamic: true}))
            .setDescription(`**${quotes}**`)
                        message.channel.send({embeds : [quoteembed]})
            }catch{}
    }
}

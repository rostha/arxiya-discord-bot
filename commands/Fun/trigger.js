const {Client,   Message, MessageEmbed, MessageAttachment } = require('discord.js');
const config = require("../../botconfig/config.json")
const canvacord = require("canvacord");
const path = require("path");
module.exports = {
    name: 'trigger',
    description: `Shows trigger dialogue of a user`,
    UserPerms: [],
    aliases: [],
usage: '>trigger <mention user>',
cooldown: 6,
category: 'emote',
BotPerms: ["EMBED_LINKS"],
        run: async (client, message, args, ) => {

            try{
            let tempmsg = await message.channel.send(client.emotes.loading + "Loading...")
            let user = message.mentions.users.first() || message.author;
            let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
            let image = await canvacord.Canvas.trigger(avatar, true);
            let attachment =  new MessageAttachment(image, "trigger.gif");
            let fastembed2 = new MessageEmbed()
            .setColor(config.colors.yes).setFooter(client.user.username, client.user.avatarURL({dynamic: true}))
            .setImage("attachment://trigger.gif")
              .setFooter(`${client.user.username}   • Image Manipulation`, client.user.avatarURL({dynamic : true}))
            await message.channel.send({embeds:[fastembed2], files: [attachment]});
            await tempmsg.delete()//convolute
            }catch{}
    }
}

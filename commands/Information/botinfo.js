
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: 'info',
    description: `Shows the information about the bot`,
    UserPerms: [],
    aliases: ["botinfo"],
    args: false,
usage: '>info',
owner: false,
cooldown: 10 ,
category: 'Information',
BotPerms: ["EMBED_LINKS"],
        run: async (client, message, args, Discord) => {
     
            const row = new MessageActionRow()
                    .addComponents(
                new MessageButton()
            .setLabel("Invite")
            .setStyle("LINK")
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1477831806&scope=applications.commands%20bot`),
                    )
        
              const mainPage = new MessageEmbed()
                    .setAuthor('ArXiya', 'https://cdn.discordapp.com/avatars/795184988035350530/2737823b669145796420d0c7372022cb.webp?size=2048')
                    .setThumbnail('https://cdn.discordapp.com/avatars/795184988035350530/2737823b669145796420d0c7372022cb.webp?size=2048')
                    .setColor(client.y.y)
                    .addField('Creator', '[ℓzα ◆ Alice#6669](https://github.com/ItzRemy69)', true)
                    .addField('Library', '[Discord.js](https://www.npmjs.com/package/discord.js)', true)
                    .addField('Hosting', '[Bero Host](https://bero-host.de)', true)
                    .addField('Version', '[5.00.04.5](https://www.npmjs.com/package/discord.js)', true)
                 .addField('Organization', '[Autumn](https://github.com/ItzRemy69)', true)
                    .addField('Repository', '[Here](https://github.com/ItzRemy69/lavamusic)', true)
                    .addField('\u200b',
                        `[ArXiya](https://github.com/ItzRemy69) by [ReYMii](https://github.com/ItzRemy69)'s was created for aesthetic server designning & Moderation. also because i wanted more for coding experience in discord api. In this project, I have tried to make it clear with less bugs. Hope you enjoy using Arxiya!`
                    )
                return message.channel.send({embeds: [mainPage], components: [row]});
    }

}

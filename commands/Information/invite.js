
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: 'invite',
    description: `Sends the invite link of the bot`,
        aliases: ["inv"],
    memberpermissions: [],
    cooldown: 5, 
  requiredroles: [], 
  alloweduserids: [], 
  minargs: 0, 
  maxargs: 0, 
  minplusargs: 0,
  maxplusargs: 0, // 
  argsmissing_message: "",
  argstoomany_message: "",
        run: async (client, message, args, Discord) => {
     
            try{
            const row = new MessageActionRow()
                    .addComponents(
                new MessageButton()
            .setLabel("Invite")
            .setStyle("LINK")
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1477831806&scope=applications.commands%20bot`),
                    )
        
              const mainPage = new MessageEmbed()
                    .setAuthor('ArXiya', 'https://cdn.discordapp.com/avatars/795184988035350530/2737823b669145796420d0c7372022cb.webp?size=2048')
                     .setColor('#303236')
                    .setFooter(`Thanks for inviting, every invite is appreciated`)
                               
                return message.channel.send({embeds: [mainPage], components: [row]});
                    }catch{}
    }

}

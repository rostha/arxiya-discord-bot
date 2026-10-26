const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const { default: axios } = require('axios');
module.exports = {
  name: "banner",
  category: "Information", 
  aliases: ["bn"], 
  cooldown: 5, 
  usage: ">banner <user>", 
  description: "Shows a user's banner in bigger screen", 
  memberpermissions: ["ADD_REACTIONS"], 
  requiredroles: [],
  alloweduserids: [],
  minargs: 0, 
  maxargs: 0, 
  minplusargs: 0, 
  maxplusargs: 0,
  argsmissing_message: "", 
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
  
    try{

            

        let user;
        if(!args[0]) user = message.author
        if(args[0] && isNaN(args[0])) user = message.mentions.users.first()
        if(args[0] && !isNaN(args[0])){
            user = client.users.cache.get(args[0])}
      
    axios
    .get(`https://discord.com/api/users/${user.id}`, {
        headers:{
            Authorization: `Bot ${client.token}`,
        }
    })
    .then((res) => {
        const{ banner, accent_color } = res.data;
        if(banner){
            const extension = banner.startsWith("a_") ?'.gif' : '.png';
            const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}`+`?size=2048`;
            const e1 = new MessageEmbed()
                  .setDescription(`
            ** Download : [Click Me](${url})**
            `)
            .setColor(client.b.b)
            .setAuthor(`${user.username}'s banner`,user.avatarURL())
            .setImage(url)
            message.channel.send({embeds : [e1]})
        }else{
            if(accent_color) {
                const e2 = new MessageEmbed()
                .setDescription(`:x: ${user.user.tag} **Doesn't have a User Banner but has a accent color**`)
                .setColor(client.b.b)
                message.channel.send({embeds : [e2]})
            }
    
        }
    })
      }catch{}

  }
}


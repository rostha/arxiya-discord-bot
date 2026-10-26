const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const moment = require('moment');

module.exports = {
  name: "membercount", 
  description: "Shows membercount of the server", 
  memberpermissions: [], 
  requiredroles: [], 
  alloweduserids: [],
  options: [],
  run: async (client, interaction) => {
    try{
	    
		const { member, channelId, guildId, applicationId, 
		        commandName, deferred, replied, ephemeral, 
				options, id, createdTimestamp 
		} = interaction; 
		const { guild } = member;
	
	
		try{
            var memberCount = client.guilds.cache.get(guildId).memberCount; 
			const membercount = new MessageEmbed()
            .setDescription(`**${memberCount}**`)
.setAuthor(`Members`, guild.iconURL())
.setFooter(` ${guild.name} `)
.setColor(client.b.b)
.setTimestamp()

			
			interaction.reply({embeds: [membercount], ephemeral: false})
		  }catch (e){
          console.log(e)
		  }
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
  }
}



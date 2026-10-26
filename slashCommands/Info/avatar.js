const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const moment = require('moment');

module.exports = {
  name: "avatar", 
  description: "View a user's avatar in bigger screen", 
  memberpermissions: [], 
  requiredroles: [], 
  alloweduserids: [],
  options: [ 

		{"User": { name: "which_user", description: "From Which User do you want to get avatar from?", required: false }}, 
	
  ],
  run: async (client, interaction) => {
    try{
	    
		const { member, channelId, guildId, applicationId, 
		        commandName, deferred, replied, ephemeral, 
				options, id, createdTimestamp 
		} = interaction; 
		const { guild } = member;
		
		let UserOption = options.getUser("which_user");
		if(!UserOption) UserOption = member.user;
	
		try{
			
			const member = guild.members.cache.get(UserOption.id);
			
			//create the EMBED
			const embeduserinfo = new MessageEmbed()
            .setDescription(`**Download: [Click Me](${member.user.displayAvatarURL({dynamic: true, size: 2048})})**`)
            .setColor(client.b.b)
            .setAuthor(`${member.user.username}'s profile pic`, member.user.avatarURL({dynamic:true}))
			embeduserinfo.setImage(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))

			
			interaction.reply({embeds: [embeduserinfo], ephemeral: false})
		  }catch (e){
            const embeduserinfo = new MessageEmbed()
            .setDescription(`**Download: [Click Me](${member.user.displayAvatarURL({dynamic: true, size: 2048})})**`)
            .setColor(client.b.b)
            .setAuthor(`${member.user.username}'s profile pic`, member.user.avatarURL({dynamic:true}))
			embeduserinfo.setImage(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))

			interaction.reply({embeds: [embeduserinfo], ephemeral: false})
		  }
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
  }
}



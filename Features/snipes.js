console.log(`Loading Snipes`)
module.exports = async (client, message) => {
    client.on("messageDelete", message => {

        if (message.channel.type == "dm") return;

        let snipes = client.snipes.get(message.channel.id) || [];
        if (snipes.length > 15) snipes = snipes.slice(0, 14);
        snipes.unshift({
         msg: message,
         image: message.attachments.first()?.proxyURL || null,
      
           time: Date.now()
            })
        client.snipes.set(message.channel.id, snipes);
      });

      
      client.on('messageUpdate', async(message, oldMessage) =>{
        if (message.channel.type == "dm") return;
        let editedsnipes = client.editedsnipes.get(message.channel.id) || [];
        if (editedsnipes.length > 15) editedsnipes = editedsnipes.slice(0, 14);
        editedsnipes.unshift({
          oldmsg: oldMessage,
         msg: message,
         image: message.attachments.first()?.proxyURL || null,
                 time: Date.now()
            })
        client.editedsnipes.set(message.channel.id, editedsnipes);
      });


      }


      console.log(`Snipes loaded`)

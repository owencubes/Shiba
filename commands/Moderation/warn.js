module.exports={
   name: "warn",
   userPermissions: "MANAGE_MESSAGES",
   description: "Warn a member",
   run: async(client,message,args)=>{
     try{
     const schema = await client.db.load("warns")
     if(!args.length) return message.reply({embeds: [client.embed({description: "You need to provide someone to warn!"},message)]})
     const shift = args.shift()
     let user = message.mentions.users.first() || message.guild.members.cache.find(m => m.user.tag.includes(shift))?.user || await message.guild.members.fetch(shift) 
     if(!user) return message.reply("That user does not exist!")
     const docs = await schema.findOne({ user: user.id }) || await schema.create({ user: user.id, warns: []})
     schema.push({})
     }catch(e){
        console.error(e)
        message.reply({ content: `An error occured!\n${e}`, code: true})
     }
   }
}

const Discord=require('discord.js')
module.exports={
    name:'help',
    run:async(bot,message)=>{
        return message.channel.send(`Sprout online!`)
    }
}
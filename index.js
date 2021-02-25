const Discord=require('discord.js');
//The word const stands for constant. discord.js is now stored in the discord variable.
const fs=require('fs');
const { join } = require('path');
const bot=new Discord.Client({
    //The bot is a new client.
    disableEveryone:true
})
const config=require('./config.json');
const prefix=config.prefix;
const token=config.token;
bot.commands=new Discord.Collection();
bot.aliases=new Discord.Collection();
bot.categories=fs.readdirSync('./commands/');
bot.prefix=config.prefix;
["command","event"].forEach(handler=>{
    require(`./handlers/${handler}`)(bot);
});
bot.on('guildMemberAdd',async(member)=>{
    require('./events/guild/guildMemberAdd')(member)
})
bot.on('voiceStateUpdate',async(oldState,NewState)=>{
    const sChannel=NewState.guild.channels.cache.get('814102737108860928')
    if(!oldState.channel&&NewState.channel){
        const joinEmbed=new Discord.MessageEmbed()
        .setTitle(`${NewState.member.user.username}, Приєднавсь до голосового.`)
        .setColor(`GREEN`)
        .setTimestamp(Date())
        .setAuthor(`${NewState.member.nickname}`, NewState.member.user.avatarURL())
        sChannel.send(joinEmbed)
    }
    if(oldState.channel&&!NewState.channel){
        const leaveEmbed=new Discord.MessageEmbed()
        .setTitle(`${NewState.member.user.username}, Вийшов з голосового.`)
        .setColor(`RED`)
        .setTimestamp(Date())
        .setAuthor(`${NewState.member.nickname}`, NewState.member.user.avatarURL())
        sChannel.send(leaveEmbed)
    }
    if(NewState.streaming&&!oldState.streaming){
         sChannel.updateOverwrite(sChannel.guild.roles.cache.get('814229032546992129'),{
             SEND_MESSAGES:true
         }).then(sChannel=>{
             console.log(`Perms Updated`);
         })
         const sEmbed=new Discord.MessageEmbed()
         .setTitle('Стрім почався, заходьте!')
         .setColor('GREEN')
         .setAuthor(`${NewState.member.user.tag}`,NewState.member.user.avatarURL())
         .setTimestamp(Date())
         const msg=await sChannel.send(`${NewState.guild.roles.cache.get('814229032546992129')}, Почав стрім!`)
         msg.edit(sEmbed)
    }
    const explicitEnd=(NewState.channel&&!NewState.streaming&&oldState.streaming&&oldState.channel)
    const indirectEnd=(!NewState.channel&&oldState.streaming&&NewState.streaming&&oldState.channel)
    if(explicitEnd||indirectEnd){
         const sEmbed=new Discord.MessageEmbed()
         .setTitle('Стрім закінчився!')
         .setColor('RED')
         .setAuthor(`${oldState.member.user.tag}`,NewState.member.user.avatarURL())
         .setTimestamp(Date())
         sChannel.updateOverwrite(sChannel.guild.roles.cache.get('814229032546992129'), {
             SEND_MESSAGES: false
         })
         NewState.guild.members.fetch().then(member => {
             member.forEach(member=>{
                 if(member.voice.streaming&&member.id!=NewState.member.id&&member.voice.channel){
                     sChannel.updateOverwrite(member.guild.roles.cache.get('814229032546992129'), {
                         SEND_MESSAGES: true
                     })
                     .then(console.log(`Perms updated.`))}
                 })
             })
             sChannel.send(sEmbed)
    }
})
bot.login(token)
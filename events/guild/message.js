const {prefix}=require('../../config.json')
module.exports=async(bot,message)=>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if (!message.guild) return;
    if(!message.member) message.member=await message.guild.fetchMember(message);
    const args=message.content.slice(prefix.length).trim().split(/ +/g);
    //take the message prefix, cut any spaces or lengths, cut it up based on the faces and ignore/splits the main command#
    const cmd=args.shift().toLowerCase();
    if (cmd.length==0) return;
    let command=bot.commands.get(cmd)
    //tell the bot to get command from the command folder
    if (!command) command=bot.commands.get(bot.aliases.get(cmd));
    //look through every alias then return an error with 
    if (command){
        command.run(bot,message,args)

    }

}
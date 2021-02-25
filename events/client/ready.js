const {prefix} = require('../../config.json')
//go to config.json and get the prefix
//exports are things that the command does or returns
module.exports=(bot)=>{
//here are the parameters you are getting to utilise
    bot.user.setActivity(`${prefix}help for a guide!`)
    //set activity to +help for a guide
    console.log(`${bot.user.username} online.`)
    //when bot is online it'll say Pythagoras online.
    //secret token thingy-majiggy Nzk4OTk5MTQ0MTA1NjQwMDU2.X_9L8A.k_6xt1rIdmYFc2wBwezUEq2kErI
}
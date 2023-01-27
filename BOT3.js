const dotenv = require("dotenv")
dotenv.config()

const { BOT_TRES, CLIENT_ID } = require("./config")

const { Client, GatewayIntentBits } = require("discord.js")

const cliente = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.MessageContent
    ]
})
cliente.once("ready", () => {  
    cliente.user.setStatus("online")

    console.log("Estado del bot: ",cliente.user.presence.status)

})

cliente.on("messageCreate",async (msg) =>{
    console.log("Bot conectado:",msg.author.username)
    console.log("Mensaje: ",msg.content)
    console.log("")

    if (msg.content == "pepe"){
        msg.channel.send("calla")
    }

    if (msg.content === "Presentaros"){
        await msg.reply("BOT 3 PRESENTE")  
    }

    if (msg.content === "Tú si que estas bobo"){
        await msg.channel.send("CALLAROS YA")
    }



})
cliente.login(BOT_TRES)


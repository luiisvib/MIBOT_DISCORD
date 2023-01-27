const dotenv = require("dotenv")
dotenv.config()

const { BOT_DOS, CLIENT_ID } = require("./config")

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
    cliente.user.setStatus("offline") //También está dnd, que significa No molestar

    console.log("Estado del bot: ",cliente.user.presence.status)

})

cliente.on("messageCreate",async (msg) =>{
    console.log("Bot conectado:",msg.author.username)
    console.log("Mensaje: ",msg.content)
    console.log("")

    if (msg.content == "caca"){
        msg.channel.send("Relajate EH")
    }

    if (msg.content === "EE BOT 2 estas bobo"){
        await msg.reply("Tú si que estas bobo")
    }

    if (msg.content === "Presentaros"){
        await msg.reply("BOT 2 PRESENTE")  
    }


})

cliente.login(BOT_DOS)


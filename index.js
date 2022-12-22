const dotenv = require("dotenv")
dotenv.config()

const { DISCORD_TOKEN, CLIENT_ID } = require("./config")

const { Client, GatewayIntentBits } = require("discord.js")
const colors = require("colors")
const { default: test } = require("node:test")
const { channel } = require("diagnostics_channel")

const cliente = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.MessageContent
    ]
})

cliente.once("ready", () => {  //Con el on siempre esta escuchando peticiones mientras que el once solo se ejecuta una vez
    console.log(`Bot ${cliente.user.tag} encendido`.bgBlue)
    console.log(`Bot ${cliente.user} encendido`.bgBlue)
    console.log(cliente.user.presence.status)
    cliente.user.setStatus("idle")
    console.log(cliente.user.presence.status)

    // const testChannel = cliente.channels.cache
    // console.log(testChannel.find( channel =>
    // channel.name === "PRUEBADAW"))  //poner el nombre del servidor

    // cliente.application.commands.set([
    //     {
    //         name: "pongo",
    //         description: "Pong Ping Pung",
    //         options: []
    //     }
    // ])
    
})

cliente.on("messageCreate",async (msg) =>{
    console.log(msg.author.username)
    console.log(msg.content)
    if (msg.author.bot){
        return
    }

    if (msg.content === "ping"){
        await msg.reply("Pong!")
        await msg.react("")  //Esto sirve para poner emoticonos
    }

    if (msg.content === "hola"){
        await msg.channel.send(`Bienvenido ${msg.author}`)
    }

    if (msg.content === "social"){
        await msg.channel.send("Este es mi linkedin https://www.linkedin.com/in/luisvib/")
    }

    let argumentos = msg.content.split(" ")
    if (argumentos[0] === "Di"){
        msg.reply(argumentos.splice(1).join(" "))
    }

    if (msg.content == msg.content.toUpperCase()){
        msg.channel.send("Relajate EH")
    }

    if (msg.content.indexOf("ostia") != -1 || msg.content.indexOf("puta") != -1){
        msg.channel.send("No digas palabrotas JODER")
    }

})

// cliente.on("interactionCreate",async inter =>{
//     if (inter.isCommand() && inter.commandName === "pongo"){
//         await inter.reply("Ping Pang Pung")
//     }
// })

cliente.login(DISCORD_TOKEN)


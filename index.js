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

    cliente.application.commands.set([
        {
            name: "pongo",
            description: "Pong Ping Pung",
            options: []
        },
    ])

})

cliente.on("interactionCreate",async inter =>{   // Esto sirve para crear una interacción, esto quiere decir que en este caso al escribir /pongo y enviarlo directamente contestartá nuestro bot con el mensaje correspondiente en este caso Ping Pang Pung
    if (inter.isCommand() && inter.commandName === "pongo"){
        await inter.reply("Ping Pang Pung")
    }
})

cliente.on("messageCreate",async (msg) =>{
    console.log(msg.author.username)
    console.log(msg.content)

    if (msg.author.bot){
        return
    }

    if (msg.content === "pretty"){
        msg.delete()  //Esto lo que hace es eliminar el mensaje mas reciente
        await msg.channel.send(`bonito`) //Esto sirve para enviar un mensaje al grupo
    }

    if (msg.content === "ping"){
        await msg.reply("Pong!")  //Reply sirve para que conteste a la persona que ha escrito el mensaje
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

    let lista = ["ostia","puta"]
    if (lista.includes(msg.content)){
        msg.channel.send("No digas palabrotas JODER")
    }

})

cliente.login(DISCORD_TOKEN)


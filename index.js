const dotenv = require("dotenv")
dotenv.config()

const { DISCORD_TOKEN, CLIENT_ID } = require("./config")

const { Client, GatewayIntentBits } = require("discord.js")
const colors = require("colors")
const { default: test } = require("node:test")

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

    const testChannel = cliente.channels.cache
    console.log(testChannel.find( channel =>
    channel.name === "PRUEBADAW"))  //poner el nombre del servidor

    console.log(testChannel)
})

cliente.login(DISCORD_TOKEN)


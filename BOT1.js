const dotenv = require("dotenv")
dotenv.config()

const { BOT_UNO, CLIENT_ID } = require("./config")

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

cliente.once("ready", () => {  //Con el on siempre esta escuchando peticiones mientras que el once solo se ejecuta una vez
    cliente.user.setStatus("idle") //idle
    // Estados del bot:
    // 
    console.log("Estado del bot: ",cliente.user.presence.status)

    cliente.application.commands.set([
        {
            name: "pongo",
            description: "Descripcion de pongo",
            options: []
        },
    ])

})

cliente.on("interactionCreate",async inter =>{   // Esto sirve para crear una interacción, esto quiere decir que en este caso al escribir /pongo y enviarlo directamente contestartá nuestro bot con el mensaje correspondiente en este caso Ping Pang Pung
    if (inter.isCommand() && inter.commandName === "pongo"){
        await inter.reply("Hola Ping Pang Pung Pro Pro Pro")
    }
})

cliente.on("messageCreate",async (msg) =>{
    console.log("Bot conectado:",msg.author.username)
    console.log("Mensaje: ",msg.content)
    console.log("")

    if (msg.author.bot){
        return
    }

    if (msg.content === "Hello"){
        msg.delete()  //Esto lo que hace es eliminar el mensaje mas reciente
        await msg.channel.send(`Aquí se habla en Español, se dice Hola`) //Esto sirve para enviar un mensaje al grupo
    }

    if (msg.content === "¿Quién es el jefe?"){
        await msg.reply("!Yo soy el jefe¡")  //Reply sirve para que conteste a la persona que ha escrito el mensaje
        await msg.react("")  //Esto sirve para poner emoticonos
    }

    if (msg.content === "linkedin"){
        await msg.channel.send("Este es mi linkedin https://www.linkedin.com/in/luisvib/")
    }

    if (msg.content === "Hola"){
        await msg.channel.send("Bienvenido "+msg.author.username)
    }

    if (msg.content === "Presentaros"){
        await msg.reply("BOT 1 PRESENTE")  
    }

    if (msg.content === "Pelearos"){
        await msg.channel.send("EE BOT 2 estas bobo")
    }

    let argumentos = msg.content.split(" ")
    if (argumentos[0] === "Di"){
        msg.reply(argumentos.splice(1).join(" "))
    }

    if (msg.content == msg.content.toUpperCase()){
        msg.channel.send("Relajate EH")
    }

    let lista_palabrotas = ["ostia","puta","mierda","joder"]
    let lista_mensaje = msg.content.split(" ")
    for (palabra of lista_mensaje){
        if (lista_palabrotas.includes(palabra)){
            msg.delete()
            msg.channel.send("No digas palabrotas")
        }
    }
})

cliente.login(BOT_UNO)


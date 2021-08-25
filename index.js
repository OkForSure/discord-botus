const { Client, Intents, Collection} = require('discord.js');
const botConfig = require('./botConfig.json');
const fs = require('fs');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){

    const command = require(`./commands/${file}`);
    client.commands.set(command.help.name, command);
    console.log(`${command.help.name} FIGHHTHT`);

}

client.once("ready", () => {
    console.log(`${client.user.username} is readydydyd!?!!!!!111!1!!`);
    client.user.setActivity('ok', {type: "COMPETING"});
    client.user.setStatus('idle');
});

client.on('messageCreate', async (message) => {
    if(message.author.bot) return;
    var prefix = botConfig.prefix;
    var messageArray = message.content.split(" ");
    var command = messageArray[0];
    if(!message.content.startsWith(prefix)) return;

    const commandData = client.commands.get(command.slice(prefix.length));

    if(!commandData) return;

    var arguments = messageArray.slice(1);

    try{
        await commandData.run(client, message, arguments)
    } catch (error) {
        console.log(error);
        await message.reply('ERR: NO1');
    }

})

client.login(botConfig.token);
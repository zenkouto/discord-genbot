const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '#';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./cmds/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./cmds/${file}`);

    client.commands.set(command.name,command);
}
client.once('ready',()=>{
    console.log('connected');
});

client.on('message',message=>{
    if(!message.content.startsWith(prefix)|| message.author.bot)return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message,args);
    }
});


client.login('ODQzNzQzNjI1MjI5NTAwNDI2.YKITfA.gCcNd7ZPrBl1MvPJAPXksUg2rUQ')
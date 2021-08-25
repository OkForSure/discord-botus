const {MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {

    const member = args[0];

    if (!message.member.permissions.has('ADMINISTRATOR') || !message.member.permissions.has('BAN_MEMBERS')) return message.reply('perms');

    if(!member) {
        return message.reply('id');
    }

    try {

        message.guild.members.unban(member);
        
        // await message.channel.send(`${member} is geunbanned!`)
        await message.reply('unbanned')

        const logEmbed = new MessageEmbed()
                .setColor('#00d61d')
                .setFooter(message.member.displayName)
                .setTimestamp()
                .setDescription(`**Geunbanned:** <@${member}> (${member})
                **Geunbanned door:** ${message.author} (${message.author.id})`)

        await client.channels.cache.find(ch => ch.name === "bans").send({embeds: [logEmbed]})

    } catch(e) {
        return message.channel.send(`ERROR: ${e}`)
    }
}

module.exports.help = {
    name: 'unban',
    description: 'Om iemand te unbannen',
    category: 'MANAGER'
}
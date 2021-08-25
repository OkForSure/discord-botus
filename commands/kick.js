const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    
    if (message.member.permissions.has('ADMINISTRATOR') || message.member.permissions.has('KICK_MEMBERS')){
        const target = message.mentions.users.first()
        const kickReason = args.slice(1).join(' ')
        if (target) {
            if(!kickReason) return message.reply('reden')

            const targetMember = message.guild.members.cache.get(target.id)
            message.reply('kick')
            targetMember.kick()

            const logEmbed = new MessageEmbed()
                .setColor('#fc3d03')
                .setFooter(message.member.displayName)
                .setTimestamp()
                .setDescription(`**Gekicked:** ${targetMember} (${targetMember.id})
                **Gekicked door:** ${message.author} (${message.author.id})
                **Reden:** ${kickReason}`)

            client.channels.cache.find(ch => ch.name === "kicks").send({ embeds: [logEmbed] })

        } else {
            message.reply('Iemand')
        }
    } else {
        message.reply('perms')
    }
}

module.exports.help = {
    name: 'kick',
    description: 'Om iemand te kicken van de server',
    category: 'STAFF'
}
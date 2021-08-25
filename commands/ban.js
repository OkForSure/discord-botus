const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    
    const { member, mentions } = message
    
    if (member.permissions.has('ADMINISTRATOR') || member.permissions.has('BAN_MEMBERS')){
        const target = mentions.users.first()
        const banReason = args.slice(1).join(' ')
        if (target) {
            const targetMember = message.guild.members.cache.get(target.id)

            if(!banReason) return message.reply('reason');

            targetMember.ban({reason: banReason})
            // message.channel.send(`${tag}, u hebt succesvol ${targetMember} gebanned.`)
            message.reply('banned')

            const logEmbed = new MessageEmbed()
                .setColor('#fc3d03')
                .setFooter(message.member.displayName)
                .setTimestamp()
                .setDescription(`**Gebanned:** ${targetMember} (${targetMember.id})
                **Gebanned door:** ${message.author} (${message.author.id})
                **Reden:** ${banReason}`)

            client.channels.cache.find(ch => ch.name === "bans").send({embeds: [logEmbed]})

        } else {
            message.reply('user')
        }
    } else {
        message.reply('perms')
    }
}

module.exports.help = {
    name: 'ban',
    description: 'Om iemand te bannem',
    category: 'MANAGER'
}
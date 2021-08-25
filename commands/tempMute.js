const { MessageEmbed} = require('discord.js')
const ms = require('ms')

module.exports.run = async (client, message, args) => {
    
    if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply('perms')
    if(!args[0]) return message.reply('user')
    if(!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply('ik perms')

    var mutePerson = client.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if(!mutePerson) return message.reply('user not found')
    if(mutePerson.permissions.has('MANAGE_MESSAGES')) return message.reply('user not muten')

    var muteRole = message.guild.roles.cache.get('879482996489613333')
    if(!muteRole) return message.reply('no mute role')

    const muteReason = args.slice(2).join(' ')

    var muteTime = args[1]

    if(!muteTime) return message.reply('no time')

    if(!muteReason) return message.reply('no reason')

    const logMuteEmbed = new MessageEmbed()
        .setColor('#fc3d03')
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setDescription(`**Gemuted:** ${mutePerson} (${mutePerson.id})
        **Gemuted door:** ${message.author} (${message.author.id})
        **Tijd:** ${muteTime}
        **Reden:** ${muteReason}`)

    client.channels.cache.find(ch => ch.name === "mute").send({embeds: [logMuteEmbed]})

    await(mutePerson.roles.add(muteRole.id))
    // message.channel.send(`${tag}, ${mutePerson} is gemuted voor ${muteTime}!`)
    message.reply('mute')

    const logUnmuteEmbed = new MessageEmbed()
        .setColor('#00d61d')
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setDescription(`**Geunmuted:** ${mutePerson} (${mutePerson.id})
        **Geunmted door:** ${message.author} (${message.author.id})
        **Gemutede tijd:** ${muteTime}`)

    setTimeout(() => {
        
        mutePerson.roles.remove(muteRole.id)
        client.channels.cache.find(ch => ch.name === "mute").send({embeds: [logUnmuteEmbed]})


    }, ms(muteTime))
}

module.exports.help = {
    name: 'tempmute',
    description: 'Om iemand te muten voor een bepaalde tijd',
    category: 'STAFF'
}
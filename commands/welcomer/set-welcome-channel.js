const Discord = require("discord.js")
module.exports = {
name: "set-welcome-channel",
run: async (client, message, args, db) => {
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(":x: | **You Cannot Use This Command!**")
  let channel = message.mentions.channels.first()
  if (!channel) return message.channel.send(":x: | **mention The channel**")
  db.set(`joinChannel_${message.guild.id}`, channel.id)
  let embed = new Discord.MessageEmbed()
  .setTitle("Welcome channel Set!")
  .setDescription("The welcome channel has Been set")
  .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
  .setTimestamp()
  .setFooter(message.guild.name + " | made by legendjs#0001", message.guild.iconURL())
  .setThumbnail(message.guild.iconURL())
  .setColor("GREEN")
  .addField("Channel", channel.toString())
  message.channel.send({embed:embed})
}
}

const moment = require("moment")
const Discord = require("discord.js")
module.exports = {
name: "set-leave-message",
run: async (client, message, args, db) => {
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(":x: | **You Cannot use this Command!**")
  let msg = args.join(" ")
  if (!msg) return message.channel.send(`:x: | **Provide The message\n\nVariables You Can use:**
\`{member-tag}\` - The members tag (example#0000)
\`{member-username}\` - The members Username
\`{member-id}\` - The members user ID
\`{member-created:duration}\` - The duration of when the members account was created (Example: 1 month ago)
\`{member-created:date}\` - The date of when the members account was created (Example: 2019/3/19)
\`{server-name}\` - The Servers name
\`{server-memberCount}\` - The Servers member Count`)
  let member = message.member
  let user = message.author
  let yus = msg
 .split("{member-tag}").join(user.tag)
 .split("{member-username}").join(user.username)
 .split("{member-id}").join(user.id)
 .split("{member-created:duration}").join(moment(user.createdTimestamp).fromNow())
 .split("{member-created:date}").join(moment(user.createdTimestamp).format("YYYY/MM/DD"))
 .split("{server-name}").join(member.guild.name)
 .split("{server-memberCount}").join(member.guild.members.cache.size)
  db.set(`leavemsg_${message.guild.id}`, msg)
  let embed = new Discord.MessageEmbed()
  .setTitle("**Leave message has been Set!**")
  .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
  .setDescription("The leave message has been set")
  .addField("Message", msg)
  .addField("Preview", yus)
  .setTimestamp()
  .setThumbnail(message.guild.iconURL())
  .setColor("GREEN")
  .setFooter(message.guild.name + " | made by legendjs#0001", message.guild.iconURL())
  message.channel.send({ embed: embed })
}
}

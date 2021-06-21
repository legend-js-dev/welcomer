console.clear()
console.log("[INFO]: Loading...")
//welcomer bot coded by legend >:D
const { Client, Collection } = require("discord.js");
const { prefix, token } = require("./config.json")
//dont touch the credits or i will find you and u will have to commit die >:D
const client = new Client({
    disableMentions: "everyone"
})
const moment = require("moment")
const db = require("quick.db")

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

console.log("-------------------------------------")
console.log(`
██╗     ███████╗ ██████╗ ███████╗███╗   ██╗██████╗         ██╗███████╗
██║     ██╔════╝██╔════╝ ██╔════╝████╗  ██║██╔══██╗        ██║██╔════╝
██║     █████╗  ██║  ███╗█████╗  ██╔██╗ ██║██║  ██║        ██║███████╗
██║     ██╔══╝  ██║   ██║██╔══╝  ██║╚██╗██║██║  ██║   ██   ██║╚════██║
███████╗███████╗╚██████╔╝███████╗██║ ╚████║██████╔╝██╗╚█████╔╝███████║
╚══════╝╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚═╝ ╚════╝ ╚══════╝
`)
console.log("-------------------------------------")
//this took me some time so dont you dare remove credits, if u do remove credits then you will have copy right issues.
client.on("ready", () => {
    console.log(`[INFO]: Ready on client (${client.user.tag})`)
    client.user.setActivity("welcomer bot by legendjs :D", { type: "WATCHING" })
})

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) 
        command.run(client, message, args, db);
});

client.on("guildMemberAdd", async member => {
  if (member.user.bot) return;
  let user = member.user
  let channelID = db.get(`joinChannel_${member.guild.id}`)
 if (channelID === null) return;
 let channel = member.guild.channels.cache.get(channelID)
 if (!channel) return;
  let joinMsg = db.get(`joinmsg_${member.guild.id}`)
  if (!joinMsg) return;
  let send = joinMsg
 .split("{member-mention}").join("<@" + user.id + ">")
 .split("{member-tag}").join(user.tag)
 .split("{member-username}").join(user.username)
 .split("{member-id}").join(user.id)
 .split("{member-created:duration}").join(moment(user.createdTimestamp).fromNow())
 .split("{member-created:date}").join(moment(user.createdTimestamp).format("YYYY/MM/DD"))
 .split("{server-name}").join(member.guild.name)
 .split("{server-memberCount}").join(member.guild.members.cache.size)
 channel.send(send)
})
client.on("guildMemberRemove", async member => {
 if (member.user.bot) return;
 let user = member.user
 let channelID = db.get(`leaveChannel_${member.guild.id}`)
 if (channelID === null) return;
 let channel = member.guild.channels.cache.get(channelID)
 if (!channel) return;
 let leaveMsg = db.get(`leavemsg_${member.guild.id}`)
 if (leaveMsg === null) return;
 let send = leaveMsg
 .split("{member-tag}").join(user.tag)
 .split("{member-username}").join(user.username)
 .split("{member-id}").join(user.id)
 .split("{member-created:duration}").join(moment(user.createdTimestamp).fromNow())
 .split("{member-created:date}").join(moment(user.createdTimestamp).format("YYYY/MM/DD"))
 .split("{server-name}").join(member.guild.name)
 .split("{server-memberCount}").join(member.guild.members.cache.size)
 channel.send(send)
})

client.login(token).catch(err => {
  console.log("[ERROR]: Invalid Token Provided")
})

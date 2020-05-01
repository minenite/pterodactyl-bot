const Command = require("../Structures/Command");
const AddStaff = require("../Structures/AddStaff.js");
const Discord = require("discord.js");
async function awaitReply(msg, question, limit = 60000) {
  const filter = (m) => m.author.id === msg.author.id;
  await msg.channel.send(question);
  try {
    const collected = await msg.channel.awaitMessages(filter, {
      max: 1,
      time: limit,
      errors: ["time"],
    });
    return collected.first().content;
  } catch (e) {
    return false;
  }
}
module.exports = class AddStaff extends Command.Command {
  constructor(client) {
    super(client, {
      name: "addstaff",
      description: "add staff members to the database",
      usage:
        "addstaff",
    });
  }
  async exec(message, args, prefix) {
    let settings = await this.client.con.models.Guild.findOne({
      id: message.guild.id,
    });
    if (
      message.member.hasPermission("ADMINISTRATOR") ||
      message.author.id === this.client.config.ownerID
    ) {
      const firstQuestion = await awaitReply(
        message,
        "Who would you like to promote to staff?"
      );
      if (firstQuestion === false)
        return message.channel.send(
          `Please give a valid answer to this question`
        );
      let mentionned;
      let allMembers = message.guild.members.cache.sort((a, b) => {
        let x = a.user.username.toLowerCase();
        let y = b.user.username.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      if (firstQuestion.mentions.users.size > 0) {
        mentionned = message.mentions.users.first();
      } else if (firstQuestion) {
        if (allMembers.get(firstQuestion)) {
          mentionned = allMembers.get(firstQuestion).user;
        } else if (
          allMembers.find((m) =>
            m.user.username.toLowerCase() === firstQuestion.toLowerCase()
              ? m
              : m.user.username
                  .toLowerCase()
                  .includes(firstQuestion.toLowerCase())
              ? m
              : false
          )
        ) {
          mentionned = allMembers.find((m) =>
            m.user.username.toLowerCase() === firstQuestion.toLowerCase()
              ? m
              : m.user.username
                  .toLowerCase()
                  .includes(firstQuestion.toLowerCase())
              ? m
              : false
          ).user;
        } else {
          mentionned = null;
        }
      } else {
        mentionned = null;
      }
      if (mentionned && mentionned !== undefined && mentionned !== null) {
        var user = mentionned;
      } else {
        var user = message.author;
      }
      if (settings.staff.includes({ key: user.id }))
        return message.channel.send(
          `It seems <@!${user.id}> is already a staff member. Please try again.`
        );
      const secondQuestion = await awaitReply(
        message,
        `Are you sure you want <@!${user.id}> to be promoted to staff? If you want another user reply with no and if you do want this user to becomes staff reply with yes.`
      );
      if (secondQuestion === false)
        return message.channel.send(
          `Please give a valid answer to this question`
        );
      if (secondQuestion === "yes") {
        obj = {
          guild: message.guild.id,
          user: user.id,
        };
        let finalizedCase = new AddStaff.AddStaff(obj);
        finalizedCase.saveToDatabase();
        message.channel.send(
          `<@!${user.id}> has successfully been added to the staff team. TO see the staff team run \`${settings.prefix}staff\``
        );
      } else if (secondQuestion === "no") {
        message.channel.send(`Operation Cancelled.`);
      }
    } else {
      return message.channel.send(
        `**You are not allowed to use this command**`
      );
    }
  }
};

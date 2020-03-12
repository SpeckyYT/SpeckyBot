module.exports = {
  name: "daily",
  aliases: [],
  usage: "",
  category: "economy",
  description: "Claim your Daily Reward [Experimental]",
  accessibleby: "member"
}

const fs = require("fs");
const moment = require("moment");

module.exports.run = async (bot, msg) => {
  let { economy } = bot
  let { author } = msg;

  let ld = economy[author.id].lastDaily;

  if (ld == "") {
    economy[author.id].lastDaily = moment()
      .utc()
      .format();
    economy[author.id].money += 500;

    let embed = bot.embed()
    .setTitle('Bank')
    .setDescription("You Claimed your **first** Daily reward.\n`500₪` has been added to your account.")
    msg.channel.send(embed);

    // Save Changes
    await require('./functions/write')(economy);
    return;
  }

  let nd = moment(ld)
    .add(1, "day")
    .utc()
    .format();
  let ct = moment()
    .utc()
    .format();
  let cr = moment(ct).isSameOrAfter(nd);

  if (cr) {
    economy[author.id].lastDaily = moment()
      .utc()
      .format();
    economy[author.id].money += 250;

    let embed = bot.embed()
    .setTitle('Bank')
    .setDescription("You Claimed your Daily reward.\n`250₪` has been added to your account.")

    msg.channel.send(embed);
  } else {
    let embed = bot.embed()
    .setColor('#FF4444')
    .setTitle('Bank')
    .setDescription("You already claimed your reward.\nCheck back " + moment(nd).fromNow())
    .setTimestamp(moment(nd))
    msg.channel.send(embed);
  }
  
  // Save Changes
  await require('./functions/write')(economy);
};

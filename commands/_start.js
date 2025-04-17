/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// If config is empty (not set yet), run /setup to initialize admin settings
if (Object.keys(config).length === 0) {
  return smartBot.run({ command: "/setup" });
}

// Track referrals (required to make RefLib.getAttractedBy work later)
RefLib.track();

// Run only for new private chats
if (chat && chat.just_created && chat.chat_type === "private") {

  // Identify the inviter, if any
  let inviter = RefLib.getAttractedBy();

  if (inviter && inviter.telegramid !== user.telegramid) {
    // Convert reward to a number (in case it's stored as a string)
    let reward = parseFloat(config.REFERRAL_REWARD) || 1;

    // Get inviter's resource objects
    let inviterBalance = Libs.ResourcesLib.anotherUserRes("balance", inviter.telegramid);
    let inviterEarnings = Libs.ResourcesLib.anotherUserRes("referral_earnings", inviter.telegramid);

    // Add reward to inviter's balance and earnings
    inviterBalance.add(reward);
    inviterEarnings.add(reward);

    // Notify inviter using SmartBot template
    smartBot.add({ reward });
    smartBot.run({
      command: "/sendMessage",
      options: {
        tgid: inviter.telegramid,
        message: smartBot.fill("{newReferralMessage}")
      }
    });
  }

  // Increase total user count
  let users = Bot.getProperty("total_users", 0);
  Bot.setProperty("total_users", users + 1, "integer");
}


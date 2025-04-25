/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Run setup if config is missing or not yet initialized
if (!config || Object.keys(config).length === 0) {
  smartBot.run({ command: '/setup' });
  return;
}

// Enables referral tracking (must be called before getAttractedBy)
RefLib.track();

// Proceed only if this is a newly created private chat
if (chat?.just_created && chat?.chat_type === 'private') {

  const inviter = RefLib.getAttractedBy();

  // Ensure inviter exists and isn't the same user
  if (inviter && inviter.telegramid !== user.telegramid) {
    const reward = Number(config.REFERRAL_REWARD) || 1;

    const inviterBalance = Libs.ResourcesLib.anotherUserRes('balance', inviter.telegramid);
    const inviterEarnings = Libs.ResourcesLib.anotherUserRes('referral_earnings', inviter.telegramid);

    // Apply referral reward to inviter's balance and earnings
    inviterBalance.add(reward);
    inviterEarnings.add(reward);

    // Send reward notification to inviter
    smartBot.add({ referral_reward: reward });
    smartBot.run({
      command: 'ref:notifyInviter',
      options: {
        inviter_id: inviter.telegramid
      }
    });
  }

  // Update total user count
  const totalUsers = Bot.getProp('total_users', 0);
  Bot.setProp({
    name: 'total_users',
    value: totalUsers + 1,
    type: "integer"
  });
}


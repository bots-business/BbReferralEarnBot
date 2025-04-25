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
function ensureConfigInitialized() {
  if(config && Object.keys(config).length >0) {
    return true;
  }

  smartBot.run({ command: '/setup' });
  return false;
}

// Handle referral reward for inviter
function handleReferralReward(inviter) {
  if (!inviter || inviter.telegramid === user.telegramid) return;

  const reward = Number(config.REFERRAL_REWARD) || 1;
  const inviterBalance = ResLib.anotherUserRes('balance', inviter.telegramid);
  const inviterEarnings = ResLib.anotherUserRes('referral_earnings', inviter.telegramid);

  inviterBalance.add(reward);
  inviterEarnings.add(reward);

  smartBot.add({ referral_reward: reward });
  smartBot.run({
    command: 'ref:notifyInviter',
    options: { inviter_id: inviter.telegramid }
  });
}

// Update total user count
function updateTotalUserCount() {
  const totalUsers = Bot.getProp('total_users', 0);
  Bot.setProp({
    name: 'total_users',
    value: totalUsers + 1,
    type: "integer"
  });
}

if (!ensureConfigInitialized()) return;

RefLib.track();

if (chat?.just_created && chat?.chat_type === 'private') {
  const inviter = RefLib.getAttractedBy();
  handleReferralReward(inviter);
  updateTotalUserCount();
}
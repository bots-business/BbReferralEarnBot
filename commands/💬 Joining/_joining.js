/*CMD
  command: /joining
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 💬 Joining
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Get a list of channels the user still needs to join
const notJoinedChats = Libs.MembershipChecker.getNotJoinedChats();

// Check if the user is already a member of all required channels
const isUserMember = Libs.MembershipChecker.isMember();

if (!isUserMember) {
  // User hasn't joined all required channels
  if (params === "check") {
    // If the user clicked "Check" button, recheck membership
    Libs.MembershipChecker.check();

    // Show an alert message explaining the issue
    return smartBot.run({
      command: "join:checkFailed"
    });
  }

  // Save the list of not joined channels for later use in message templates
  smartBot.add({ notJoinedChats });
} else {
  // User has joined all channels — continue to main menu
  return smartBot.run({
    command: "/menu edit"
  });
}


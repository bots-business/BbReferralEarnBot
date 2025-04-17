/*CMD
  command: /joining
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 💬 Joining

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Get a list of the channels the user hasn't joined yet
const notJoinedChats = Libs.MembershipChecker.getNotJoinedChats();

// Check if the user is a member of all required channels
const isUserMember = Libs.MembershipChecker.isMember();

if (!isUserMember) {
  // If the user isn't a member, prepare the error message
  const joinErrorMessage = smartBot.fill("{notJoinedChatsError}");

  if (params === "check") { 
    // Only check membership if 'params' is 'check'
    Libs.MembershipChecker.check();

    // Send a callback query with the error message to alert the user
    return Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: joinErrorMessage,
      show_alert: true
    });
  }

  // Store the list of not joined chats in the bot's data for future reference
  smartBot.add({ notJoinedChats });
} else {
  // If the user is a member, proceed to the main menu
  return smartBot.run({
    command: "/menu edit"
  });
}


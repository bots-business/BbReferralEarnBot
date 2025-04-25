/*CMD
  command: /broadcast_created
  help:
  need_reply: false
  auto_retry_time:
  folder: 🔐 Admin
  answer:
  keyboard:
  aliases:
  group:
CMD*/

if (!options) return;

const task = options.run_all_task;
Bot.sendMessage(
  `🎉 Task for broadcasting created. Task ID: \`${task.id}\`\nFor more details, please check the BB app.`
);

/*CMD
  command: lng-es
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 🌐 Lang
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

const currentLang = "🇪🇸 Spanish";

// Objeto de configuración del idioma
const LANG = {
  "commands": {
    "/start": {
      "alias": "#/button/changeLanguage",
      "text": "*🌐 Elige tu idioma preferido*\n\n_Idioma actual:_ *{curLang}*",
      "inline_buttons": "#/keyboard/selectlanguage"
    },
    "/joining": {
      "edit": true,
      "text": "🔔 *Unirse a los Canales Requeridos*\n\nPara seguir usando el bot, asegúrate de haberte unido a todos los canales listados abajo:\n\n{notJoinedChats}",
      "inline_buttons": [[{ "text": "✅ Ya me uní – Continuar", "command": "/joining check" }]]
    },
    "join:checkFailed": {
      "alert": "⚠️ Por favor únete a todos los canales requeridos para continuar.\n\nEspera unos segundos después de unirte y vuelve a intentarlo."
    },
    "/menu": {
      "edit": true,
      "text": "🎉 *¡Bienvenido a Nuestro Bot de Referencias!* \n\n¡Comienza a ganar {currency} refiriendo amigos y desbloqueando recompensas! 🚀\n\nSelecciona una opción abajo para seguir tus ganancias, reclamar bonificaciones y hacer crecer tus recompensas! 💰",
      "inline_buttons": "#/keyboard/userMenu"
    },
    "/balance": {
      "edit": true,
      "text": "💰 *Tu saldo de billetera*\n\n🔹 Saldo Total: *{balance} {currency}*\n✅ Disponible para Retiro: *{available_balance} {currency}*\n⏳ Retiro Pendiente: *{pending_balance} {currency}*\n\n🚀 ¡Invita amigos y observa crecer tu saldo!",
      "inline_buttons": "#/keyboard/userMenu"
    },
    "bonus:received": {
      "edit": true,
      "text": "🎉 *¡Felicidades! ¡Bono recibido!*\n\n💸 Has ganado *{bonus} {currency}* solo por participar!\n⏰ Próximo bono en *{interval} horas*.\n\n👥 ¡Invita a tus amigos y gana más, así de fácil!",
      "inline_buttons": "#/keyboard/userMenu"
    },
    "bonus:alreadyClaimed": {
      "edit": true,
      "text": "⏳ *¡Bono ya reclamado!*\n\n🕒 Necesitas esperar *{remaining} horas* antes de poder reclamar nuevamente.\n\n📢 ¡No te quedes esperando — comparte tu enlace de referido y sigue ganando!",
      "inline_buttons": "#/keyboard/userMenu"
    },
    "/referral_info": {
      "edit": true,
      "text": "👥 *Tus estadísticas de referidos*\n\n🔗 *Tu enlace:* `{referral_link}`\n\n👤 *Total de referidos:* {referral_count}\n💰 *Ganancias por referidos:* {referral_earnings} {currency}\n\n🎉 *¡Gana {referral_bonus} {currency}* por cada usuario que se registre usando tu enlace de referido!\n\n📢 ¡Comparte tu enlace y sigue ganando!",
      "inline_buttons": "#/keyboard/userMenu"
    },
    "ref:notifyInviter": {
      "chat_id": "{inviter_id}",
      "text": "🎉 *¡Nuevo referido!*\n\n¡Tu amigo acaba de unirse y has ganado *{referral_reward}* {currency}!"
    },
    "/manage_wallet": {
      "edit": true,
      "text": "💼 *Administrar billetera*\n\nAquí puedes configurar o actualizar tu dirección de billetera para retiros.\n\n🔐 *Billetera actual:* `{wallet_address}`",
      "inline_buttons": [
        [
          { "text": "✏️ Actualizar billetera", "command": "/update_wallet" },
          { "text": "🔙 Volver al menú", "command": "/menu" }
        ]
      ]
    },
    "/update_wallet": {
      "edit": true,
      "text": "💼 *Actualizar dirección de billetera*\n\n📝 Envía tu nueva dirección de billetera. Será utilizada para *retiros* — asegúrate de que sea correcta.\n\n❌ Haz clic en /cancel para detener.",
      "run": { "command": "/set_wallet" },
      "inline_buttons": []
    },
    "/set_wallet": {
      "edit": true,
      "message_id": "{message_id}",
      "text": "✅ *¡Billetera actualizada!*\n\nTu nueva dirección ha sido guardada exitosamente.",
      "inline_buttons": "#/keyboard/backToWallet"
    },
    "/set_wallet_cancel": {
      "edit": true,
      "message_id": "{message_id}",
      "text": "✅ *¡Actualización de billetera cancelada!*\n\nNo se realizaron cambios en tu dirección de billetera.",
      "inline_buttons": "#/keyboard/backToWallet"
    },
    "/cancel": {
      "edit": true,
      "message_id": "{message_id}",
      "text": "🚫 *¡Solicitud cancelada!*\n\nNo te preocupes — hemos detenido el proceso actual por ti.\n\n¡Puedes explorar otras opciones del menú en cualquier momento!",
      "inline_buttons": "#/keyboard/backToMenu"
    },
    "/alert": {
      "alert": "{message}"
    },
    "/sendMessage": {
      "chat_id": "{tgid}",
      "text": "{message}"
    },
    "/editMessage": {
      "edit": true,
      "message_id": "{message_id}",
      "text": "{message}",
      "inline_buttons": "#/keyboard/backToMenu"
    },
    "/faq": {
      "edit": true,
      "text": "❓ *Centro de Soporte*\n\nAquí tienes respuestas a algunas preguntas comunes:\n\n💰 *¿Cómo retiro dinero?*\nVe a *Administrar billetera* para configurar tu dirección, luego selecciona *Retirar* desde el menú.\n\n🎁 *¿Cómo reclamo el bono?*\nHaz clic en *Bono* en el menú cada pocas horas para reclamar tu recompensa.\n\n👥 *¿Cómo funcionan los referidos?*\nComparte tu enlace de referido. Ganas un bono cuando alguien se une y usa el bot.\n\n¿Necesitas más ayuda? Haz clic abajo para contactar con soporte.",
      "inline_buttons": [
        [{ "text": "📨 Contactar Soporte", "command": "/support" }],
        [{ "text": "🔙 Volver al menú", "command": "/menu" }]
      ]
    },
    "/support": {
      "edit": true,
      "text": "📨 *Contactar Soporte*\n\nSi no encontraste tu respuesta en el FAQ, ¡nuestro equipo está aquí para ayudarte!\n\nPor favor describe tu problema claramente y te responderemos lo antes posible.\n\nPuedes hacer clic en /cancel si cambiaste de opinión.",
      "run": { "command": "/support_request" }
    },
    "/support_request": {
      "edit": true,
      "message_id": "{message_id}",
      "text": "✅ *¡Mensaje Enviado!*\n\nGracias por comunicarte — nuestro equipo de soporte ha recibido tu mensaje.\n\nNos pondremos en contacto contigo pronto. ¡Por favor, ten paciencia!",
      "inline_buttons": "#/keyboard/backToMenu"
    },
    "/statistics": {
      "edit": true,
      "text": "📊 *Resumen del rendimiento del bot*\n━━━━━━━━━━━━━━━\n\n👥 *Usuarios totales:* {total_users}\n\n🏆 *Mejores referidos:*\n{top_referrals}\n━━━━━━━━━━━━━━━\n⏱ _Las estadísticas se actualizan automáticamente en tiempo real._",
      "inline_buttons": "#/keyboard/userMenu"
    },
    "/history": {
      "edit": true,
      "text": "*📝 Tus últimos {count} retiros:*\n{withdrawals}\n✨ _Si necesitas ayuda, no dudes en preguntar!_",
      "inline_buttons": "#/keyboard/backToMenu"
    },
    "history:noData": {
      "alert": "⚠️ ¡No tienes historial de retiros aún! \n\nAún no has realizado ningún retiro. Una vez que lo hagas, tu historial aparecerá aquí."
    },
    "/withdraw": {
      "edit": true,
      "text": "💸 *Solicitud de Retiro*\n\n🧾 *Tu saldo:* {balance} {currency}\n\nPor favor ingresa el monto que te gustaría retirar a continuación.\n\nSi cambias de opinión, solo haz clic en /cancel.",
      "run": { "command": "acceptWithdrawAmount" }
    },
    "withdraw:notifyUser": {
      "chat_id": "{user_telegramid}",
      "text": "👋 ¡Hola! Tu solicitud de retiro de *{amount} {currency}* ha sido {status}. 💸"
    },
    "withdraw:postAnnouncement": {
      "chat_id": "{channel_id}",
      "text": "📢 *¡Retiro procesado!* \n\n👤 *ID de usuario:* {userId}\n💵 *Monto:* {amount} {currency}\n⏱ *Hora:* {time}"
    },
    "admin:accessDenied": {
      "chat_id": "{user_telegramid}",
      "text": "#/adminOnlyError"
    },
    "admin:alertAccessDenied": {
      "alert": "#/adminOnlyError"
    },
    "admin:supportRequest": {
      "chat_id": "{admin_telegramid}",
      "text": "📬 *Nueva solicitud de soporte*\n\n👤 *ID de usuario:* {user_id}\n\n📝 *Mensaje:* {support_message}"
    },
    "admin:withdrawRequest": {
      "chat_id": "{admin_channel}",
      "text": "🔔 *¡Nueva solicitud de retiro!*\n\n👤 *ID de usuario:* {user_id}\n💰 *Monto solicitado:* {amount} {currency}\n👛 *Billetera de retiro:* {wallet_address}\n\n⚖️ _Por favor revisa la solicitud y toma una acción a continuación:_",
      "inline_buttons": [
        [{ "text": "✅ Aprobar", "callback_data": "/approve_withdraw true {user_id} {withdrawId}" }, { "text": "❌ Rechazar", "callback_data": "/approve_withdraw false {user_id} {withdrawId}" }]
      ]
    },
    "admin:withdrawResponse": {
      "edit": true,
      "text": "🔧 *Retiro {status}* para el ID de usuario: {userId}.\n💵 Monto: {amount} {currency}\n⏱ *Hora:* {time}",
      "inline_buttons": []
    },
    "/admin": {
      "text": "🔧 *Comandos de Administrador*:\n\n1️⃣ /ban [user_id] - Banear a un usuario.\n2️⃣ /unban [user_id] - Desbanear a un usuario.\n3️⃣ /broadcast - Responder al mensaje que quieres enviar a todos los usuarios."
    },
    "acceptWithdrawAmount": {
      "edit": true,
      "message_id": "{message_id}",
      "text": "✅ *¡Tu solicitud de retiro ha sido enviada!*\n\n💰 *Monto:* {amount} {currency}\n👛 *Billetera:* {wallet_address}\n\n⏳ Por favor espera mientras nuestro equipo revisa y procesa tu solicitud. Serás notificado una vez que sea aprobada o rechazada.",
      "inline_buttons": "#/keyboard/backToMenu",
      "dialogErrors": {
        "invalid": "❌ *¡Ups! Monto inválido!*\n{amount} no es un número válido.\n\nEso no parece correcto, intenta nuevamente con un número adecuado (máximo: {balance}).",
        "zero": "⚠️ *¡No hay fondos disponibles!*\nTu saldo está actualmente en cero.\n\nNecesitarás ganar algo de dinero primero — ¡referir amigos es una excelente manera de empezar! 😉",
        "notEnough": "❌ *¡Fondos insuficientes!*\nIngresaste {amount}, pero tu saldo solo es de {balance}.\n\nIntenta nuevamente con un monto dentro de tu saldo disponible.",
        "small": "❌ *¡Monto demasiado pequeño!*\n{amount} está por debajo del límite mínimo de retiro.\n\nIntenta nuevamente con un monto entre *{minimum_withdraw}* y *{balance}*.",
        "big": "❌ *¡Monto demasiado grande!*\n{amount} excede el límite máximo de retiro.\n\nIntenta nuevamente con un monto no mayor a *{balance}*.",
        "notInteger": "❌ *¡Solo números enteros!*\n{amount} no es un número entero.\n\nIntenta nuevamente usando un monto válido (sin decimales)."
      }
    }
  },
  "titles": {
    "curLang": currentLang
  },
  "types": {
    "adminOnlyError": "⛔ ¡Acceso denegado!\n\nEsta acción está restringida solo a administradores.",
    "button": {
      "cancel": "❌ Cancelar"
    },
    "keyboard": {
      "returnBack": [
        [{ "text": "⬅️ Volver", "command": "{command}" }]
      ],
      "backToMenu": [
        [{ "text": "⬅️ Volver al menú", "command": "/menu" }]
      ],
      "backToWallet": [
        [{ "text": "💼 Volver a billetera", "command": "/manage_wallet" }]
      ],
      "selectlanguage": [
        [
          { "text": "🇺🇸 English", "command": "setLng en" },
          { "text": currentLang, "command": "setLng es" }
        ]
      ],
      "userMenu": [
        [{ "text": "💰 Balance", "command": "/balance" }],
        [{ "text": "🎁 Bono", "command": "/claim_bonus" }, { "text": "📊 Referidos", "command": "/referral_info" }],
        [
          { "text": "💵 Retirar", "command": "/withdraw" },
          { "text": "📜 Historial", "command": "/history" }
        ],
        [{ "text": "💼 Administrar billetera", "command": "/manage_wallet" }],
        [
          { "text": "📈 Estadísticas", "command": "/statistics" },
          { "text": "❓ Soporte", "command": "/faq" }
        ]
      ]
    }
  }
}

// Configurar idioma para el bot
smartBot.setupLng("es", LANG);

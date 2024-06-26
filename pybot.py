from telegram import Update, ReplyKeyboardMarkup, ParseMode
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext, ConversationHandler

TOKEN = '7385581017:AAGAo99g_EwJbb3jf7ZHI5uT0n1SS7VzBa0'

# Admin IDs
ADMIN_IDS = [1634381802, 7329709650]

# Define the main menu layout
main_menu_buttons = [
    ["Зарегистрироваться на IELTS", "✍🏽Оставить жалобу или предложение"],
    ["📄 Публичная оферта", "📍Локация"],
    ["💰 Тарифы", "🧑‍💻Тесты на определение уровня"],
    ["📝 Записаться на урок"]
]

# Define the branch menu layout
branch_menu_buttons = [
    ["Branch 1", "Branch 2"],
    ["Go back"]
]

# Store user IDs
users = set()

# States for conversation
ASKING_ADMIN_OR_USER, ASKING_ADMIN_ACTION, BROADCAST_MESSAGE = range(3)


def escape_markdown_v2(text):
    escape_chars = r'\_*[]()~`>#+-=|{}.!'
    return ''.join(['\\' + char if char in escape_chars else char for char in text])


def start(update: Update, context: CallbackContext) -> int:
    user_id = update.message.from_user.id
    users.add(user_id)

    if user_id in ADMIN_IDS:
        reply_markup = ReplyKeyboardMarkup([["Admin", "User"]], resize_keyboard=True)
        update.message.reply_text('Are you an Admin or User?', reply_markup=reply_markup)
        return ASKING_ADMIN_OR_USER
    else:
        reply_markup = ReplyKeyboardMarkup(main_menu_buttons, resize_keyboard=True)
        update.message.reply_text('Please choose a menu:', reply_markup=reply_markup)
        return ConversationHandler.END


def ask_admin_or_user(update: Update, context: CallbackContext) -> int:
    text = update.message.text
    if text == "Admin":
        reply_markup = ReplyKeyboardMarkup([["See User Count", "Send Message"]], resize_keyboard=True)
        update.message.reply_text('What would you like to do?', reply_markup=reply_markup)
        return ASKING_ADMIN_ACTION
    elif text == "User":
        reply_markup = ReplyKeyboardMarkup(main_menu_buttons, resize_keyboard=True)
        update.message.reply_text('Please choose a menu:', reply_markup=reply_markup)
        return ConversationHandler.END
    else:
        update.message.reply_text('Please choose either "Admin" or "User".')
        return ASKING_ADMIN_OR_USER


def handle_admin_action(update: Update, context: CallbackContext) -> int:
    text = update.message.text
    if text == "See User Count":
        update.message.reply_text(f'Total users: {len(users)}')
        return ASKING_ADMIN_ACTION
    elif text == "Send Message":
        update.message.reply_text('Please send the message you want to broadcast to all users.')
        return BROADCAST_MESSAGE
    else:
        update.message.reply_text('Please choose a valid option.')
        return ASKING_ADMIN_ACTION


def broadcast(update: Update, context: CallbackContext) -> int:
    if update.message.from_user.id in ADMIN_IDS:
        message = update.message.text
        for user_id in users:
            try:
                context.bot.send_message(chat_id=user_id, text=message)
            except Exception as e:
                print(f"Could not send message to {user_id}: {e}")

        # After broadcasting, ask for the next admin action
        reply_markup = ReplyKeyboardMarkup([["See User Count", "Send Message"]], resize_keyboard=True)
        update.message.reply_text('Message sent to all users. What would you like to do next?',
                                  reply_markup=reply_markup)
        return ASKING_ADMIN_ACTION


# Menu button handler
def handle_menu(update: Update, context: CallbackContext) -> None:
    text = update.message.text
    user_id = update.message.from_user.id
    users.add(user_id)

    if text == "Зарегистрироваться на IELTS":
        response = escape_markdown_v2("This is Зарегистрироваться на IELTS.")
    elif text == "✍🏽Оставить жалобу или предложение":
        response = escape_markdown_v2(
            "Вы можете направить свою жалобу или предложение напрямую владельцу Sevenine -> @temur_abzalov")
    elif text == "📄 Публичная оферта":
        context.bot.send_document(chat_id=update.effective_chat.id, document=open('Oferta.pdf', 'rb'))
        return
    elif text == "📍Локация":
        reply_markup = ReplyKeyboardMarkup(branch_menu_buttons, resize_keyboard=True)
        update.message.reply_text('Please choose a branch:', reply_markup=reply_markup)
        return
    elif text == "💰 Тарифы":
        response = escape_markdown_v2("This is 💰 Тарифы.")
    elif text == "🧑‍💻Тесты на определение уровня":
        response = escape_markdown_v2(
            "LINK FOR GRAMMAR TEST (https://docs.google.com/forms/d/e/1FAIpQLScBGKuRz1_4L01co5Zg5_9sefF4lCCb4I-WP2SEv0g-rAfQig/viewform?usp=sharing)\n⬆️⬆️⬆️\nПосле прохождения этого теста, не забудьте нам отправить результат в виде скриншота 🙂")
    elif text == "📝 Записаться на урок":
        response = escape_markdown_v2("https://times-school.modme.uz/entry/lead?utm_source=Telegram")
    elif text == "Branch 1":
        response = escape_markdown_v2(
            "Times School Branch 1\nЮнусабадский район, улица Янги Юнусабад, 2Б, город Ташкент.\n[Google Maps](https://maps.app.goo.gl/HRyajkPbdwUozred6)\n[Yandex Maps](https://yandex.com/maps/-/CDCM6D1O)\n+998 99 249 49 79")
        update.message.reply_text(response, parse_mode=ParseMode.MARKDOWN_V2)
        context.bot.send_location(chat_id=update.effective_chat.id, latitude=41.3719809, longitude=69.3164292)
        return
    elif text == "Branch 2":
        response = escape_markdown_v2(
            "Times School Branch 2\nЮнусабадский район, улица Ахмад Дониш, дом - 81, город Ташкент.\n[Google Maps](https://maps.app.goo.gl/z2fdgzcziKph3Mvc8)\n[Yandex Maps](https://yandex.com/maps/-/CDCMb8I8)\n+998 33 349 49 89")
        update.message.reply_text(response, parse_mode=ParseMode.MARKDOWN_V2)
        context.bot.send_location(chat_id=update.effective_chat.id, latitude=41.3620436, longitude=69.2804666)
        return
    elif text == "Go back":
        reply_markup = ReplyKeyboardMarkup(main_menu_buttons, resize_keyboard=True)
        update.message.reply_text('Please choose a menu:', reply_markup=reply_markup)
        return
    else:
        response = escape_markdown_v2("Please choose a valid menu option.")

    if text not in ["Branch 1", "Branch 2"]:
        update.message.reply_text(response, parse_mode=ParseMode.MARKDOWN_V2)


def cancel(update: Update, context: CallbackContext) -> int:
    update.message.reply_text('Action cancelled. Use /start to begin again.',
                              reply_markup=ReplyKeyboardMarkup(main_menu_buttons, resize_keyboard=True))
    return ConversationHandler.END


def main() -> None:
    updater = Updater(TOKEN)

    dispatcher = updater.dispatcher

    # Conversation handler for admin actions
    conv_handler = ConversationHandler(
        entry_points=[CommandHandler("start", start)],
        states={
            ASKING_ADMIN_OR_USER: [MessageHandler(Filters.text & ~Filters.command, ask_admin_or_user)],
            ASKING_ADMIN_ACTION: [MessageHandler(Filters.text & ~Filters.command, handle_admin_action)],
            BROADCAST_MESSAGE: [MessageHandler(Filters.text & ~Filters.command, broadcast)]
        },
        fallbacks=[CommandHandler("start", start)]
    )

    dispatcher.add_handler(conv_handler)
    dispatcher.add_handler(MessageHandler(Filters.text & ~Filters.command, handle_menu))

    updater.start_polling()

    updater.idle()


if __name__ == '__main__':
    main()

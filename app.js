
import TelegramBot from "node-telegram-bot-api"
import Dotenv from "dotenv"

Dotenv.config()
const bot = new TelegramBot(process.env.token, { polling: true })


bot.onText(/start/, msg => {

    bot.sendMessage(msg.chat.id, `Assalomu alaykum @${msg.chat.username}`, {
        reply_markup: JSON.stringify({
            keyboard: [
                [
                    {
                        text: "menu"
                    },
                    {
                        text: "video"
                    }
                ]
            ],
            resize_keyboard: true
        })
    })
})

bot.on("message", msg => {
    const chatId = msg.chat.id
    if (msg.text == "menu" || msg.text === "Asosiy menuga qaytish") {
        bot.sendMessage(chatId, "Asosiy menu", ({
            reply_markup: JSON.stringify({
                keyboard: [
                    [
                        {
                            text: "Foods"
                        },
                        {
                            text: "Drinks"
                        }
                    ],
                    [
                        {
                            text: "/start"
                        }
                    ]
                ],
                resize_keyboard: true
            })
        }))
    }

    if (msg.text === "Foods" || msg.text === "Fast food menuga qaytish") {
        bot.sendMessage(chatId, "Fast food menu", ({
            reply_markup: JSON.stringify({
                keyboard: [
                    [
                        {
                            text: "Lavash"
                        },
                        {
                            text: "Burger"
                        },
                        {
                            text: "Hot Dog"
                        },
                        {
                            text: "OSH"
                        }
                    ],
                    [
                        {
                            text: "Asosiy menuga qaytish"
                        }
                    ]
                ],
                resize_keyboard: true
            })
        }))
    }

    if (msg.text === "Lavash") {
        bot.sendPhoto(chatId, "./image/lavash.jpg", {
            caption: `
            <strong>Lavash haqida 😊 </strong>
            <span class="tg-spoiler">Narxi: <i>25000</i></span>
            <span class="tg-spoiler">Tarkibi: <i>Sirli va goshtli </i></span>
            `,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Zakaz berish",
                            callback_data: "zakaz"
                        },
                        {
                            text: "Batafsil",
                            url: "https://evos.uz/uz"
                        }
                    ]
                ]
            }
        })
    }
})

bot.on("callback_query", async msg => {
    const chatId = msg.message.chat.id
    if (msg.data == "zakaz") {
        await bot.sendMessage(chatId, "Contactingizni qoldiring", {
            reply_markup: JSON.stringify({
                keyboard: [
                    [
                        {
                            text: "Contactni berish",
                            request_contact: true
                        },
                        {
                            text: "Locatsiyani berish",
                            request_location: true
                        }
                    ],
                    [
                        {
                            text: "Fast food menuga qaytish"
                        }
                    ]
                ],
                resize_keyboard: true
            })
        })
    }
})

import { read_file, write_file } from "./fs/fs_api.js"


const contacts = read_file("zakaz.json")
bot.on("contact", msg => {
    const { phone_number, first_name, user_id } = msg.contact
    let foundetContact = contacts.find(c => c.user_id === user_id)

    if (foundetContact) {
        return
    } else {

        contacts.push({
            user_id,
            first_name,
            phone_number
        })
        write_file('zakaz.json', contacts)
        return bot.sendMessage(msg.chat.id, 'Operator tez orada javob beradi!!!')
    }
})

bot.on("location", msg => {
    let { latitude, longitude } = msg.location
    console.log(latitude);
    console.log(longitude);
    bot.sendLocation(msg.chat.id, latitude, longitude)
})
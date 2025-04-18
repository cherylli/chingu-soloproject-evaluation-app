import {messages} from "@/data/passMessages";
import {emojis} from "@/data/discordEmoji";

export const getRandomPassMessage = (discordName: string) => {
    return `${messages[Math.floor(Math.random() * messages.length)].replace('{name}', discordName)} `+
        `${emojis[Math.floor(Math.random() * emojis.length)]} \n\nWe have DM'd you your feedback. Please also check your message requests or spam.`
}
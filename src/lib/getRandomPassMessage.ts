import { emojis } from '@/data/discordEmoji';
import { messages } from '@/data/passMessages';

export const getRandomPassMessage = (discordId: string) => {
  return (
    `${messages[Math.floor(Math.random() * messages.length)].replace('{discordId}', discordId)} ` +
    `${emojis[Math.floor(Math.random() * emojis.length)]} \n\nWe have DM'd you your feedback. Please also check your message requests or spam.`
  );
};

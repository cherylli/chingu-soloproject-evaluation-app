'use server';

import { env } from '@/env';

export const sendMessageToDiscordRingTheBell = async (
  message: string
) => {
  const webhookUrl = env.DISCORD_RING_THE_BELL_WEBHOOK_URL;

  try {
    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: message }),
    });

    if (!discordResponse.ok) {
      throw new Error(
        `Failed to send message to Discord. Status: ${discordResponse.status}`
      );
    }

    return {
      success: true,
      message: 'Message sent to Discord successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to send message to Discord. Error: ${error}`,
    };
  }
};

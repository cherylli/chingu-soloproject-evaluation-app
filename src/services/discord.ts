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

export const sendDiscordDM = async (
  discordId: string,
  message: string
) => {
  try {
    // TODO: validate with zod
    const response = await fetch(
      env.N8N_WEBHOOK_SEND_DISCORD_MSG,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.N8N_CHINGU_API_KEY,
        },
        body: JSON.stringify({
          discordId,
          message,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to send message to Discord. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      `Failed to send message to Discord. Error: ${error}`
    );
  }
};

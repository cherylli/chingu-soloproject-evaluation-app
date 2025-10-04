import { z } from 'zod';

export const DiscordIdSchema = z.coerce.string().length(18);

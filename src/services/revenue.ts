import { createOrFilter } from '@/lib/airtable';
import { getRecordsByFilter } from '@/services/common';
import { ActionResponse, SearchableFields } from '@/types';
import { FinanceRevenue } from '@/types/FinanceRevenueType';
import { DiscordIdSchema } from '@/types/validationSchema';
import { z } from 'zod';

export const getRevenueRecordsbyMember = async (
  discordId?: string,
  email?: string
): Promise<ActionResponse<FinanceRevenue[]>> => {
  const validation = z
    .object({
      discordId: DiscordIdSchema.optional(),
      email: z.email().optional(),
    })
    .refine(
      (data) => data.discordId || data.email,
      'Either discordId or email must be provided.'
    )
    .safeParse({ discordId, email });

  if (!validation.success) {
    return {
      success: false,
      message: `Validation failed: ${validation.error.message}`,
    };
  }

  try {
    const filter: {
      field: SearchableFields;
      value: string;
    }[] = [];
    if (validation.data.discordId) {
      filter.push({
        field: 'Discord ID (from Applications)',
        value: validation.data.discordId,
      });
    }
    if (validation.data.email) {
      filter.push({
        field: 'Payee Email',
        value: validation.data.email,
      });
    }

    const records = await getRecordsByFilter(
      'financeRevenue',
      () => createOrFilter(filter)
    );

    if (!records.success) {
      return {
        success: false,
        message: `Failed to get subscription data. Email: ${email}, DiscordId: ${discordId}`,
      };
    }
    return {
      success: true,
      message: `Successfully fetched subscription data. Email: ${email}, DiscordId: ${discordId}`,
      data: records.data,
    };
  } catch (error) {
    throw new Error(
      `Failed to get subscription data. Error: ${error}`
    );
  }
};

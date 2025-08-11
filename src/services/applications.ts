'use server';

import { applicationTable, createOrFilter, transformApplicationRecords } from '@/lib/airtable';
import { ActionResponse } from '@/types';
import { Application, ApplicationSearchableFields } from '@/types/ApplicationTypes';

// TODO: maybe can refactor to combine with getVoyageSignup and soloProject
export const getApplicationsByMember = async (
  discordId?: string,
  email?: string
): Promise<ActionResponse<Application[]>> => {
  if (!discordId && !email) {
    return {
      success: false,
      message: 'Either discordId or email must be provided.',
    };
  }

  try {
    const conditions: { field: ApplicationSearchableFields; value: string }[] = [];

    if (discordId) {
      conditions.push({ field: 'Discord ID', value: discordId });
    }
    if (email) {
      conditions.push({ field: 'Email', value: email });
    }

    const filter = createOrFilter(conditions);

    const records = await applicationTable
      .select({
        filterByFormula: filter,
      })
      .all();

    return {
      success: true,
      data: transformApplicationRecords(records),
      message: 'Successfully get application data.',
    };
  } catch (e) {
    throw new Error(`Failed to get application data. Error: ${e}`);
  }
};

// construct airtable base url based on context

import { env } from '@/env';
import { Context } from '@/types';

const contextMap: Record<Context, string> = {
  'solo-project': env.AIRTABLE_TABLEID,
  'voyage-signup': env.AIRTABLE_VOYAGE_SIGNUP_TABLEID,
  'voyage-checkin': env.AIRTABLE_CHECKIN_TABLEID,
  application: env.AIRTABLE_APP_TABLEID,
  schedule: env.AIRTABLE_SCHEDULE_TABLEID,
};

// Airtable table URL / base url for records
export const getATBaseURL = (context: Context) => {
  return `https://airtable.com/${process.env.AIRTABLE_BASEID}/${contextMap[context]}`;
};

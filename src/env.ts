import { z } from 'zod';

const envSchema = z.object({
  // airtable
  AIRTABLE_BASEURL: z.url(),
  AIRTABLE_BASEID: z.string().startsWith('app'),
  AIRTABLE_TABLEID: z.string().startsWith('tbl'),
  AIRTABLE_USERS_TABLEID: z.string().startsWith('tbl'),
  AIRTABLE_APP_TABLEID: z.string().startsWith('tbl'),
  AIRTABLE_CHECKIN_TABLEID: z.string().startsWith('tbl'),
  AIRTABLE_VOYAGE_SIGNUP_TABLEID: z.string().startsWith('tbl'),
  AIRTABLE_SCHEDULE_TABLEID: z.string().startsWith('tbl'),
  AIRTABLE_PAT: z.string().startsWith('pat'),
  // auth (next-auth and github)
  NEXTAUTH_URL: z.url().optional(),
  NEXTAUTH_SECRET: z.string(),
  GITHUB_SECRET: z.string(),
  GITHUB_ID: z.string(),
  REVALIDATE_TOKEN: z.string(),
  // firebase
  FIREBASE_STORAGE_BUCKET: z.string(),
  // sentry
  SENTRY_AUTH_TOKEN: z.string().startsWith('sntrys_').optional(),
  // general app keys
  NEXT_PUBLIC_MAINTENANCE: z.coerce.boolean().default(false),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    `❌ Invalid environment variables: ${JSON.stringify(z.treeifyError(parsedEnv.error))}`
  );
  throw new Error(
    `❌ Invalid environment variables: ${JSON.stringify(z.treeifyError(parsedEnv.error))}`
  );
}

export const env = parsedEnv.data;

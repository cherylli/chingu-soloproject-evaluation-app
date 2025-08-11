export type Application = {
  id: string;
  fields: ApplicationFields;
};

export type ApplicationFields = {
  Timestamp: string;
  Email: string;
  'Discord Name': string;
  'Discord ID': string;
};

/**
 * An array of application soloProjectFields that are searchable by the application.
 *
 * This array specifies the soloProjectFields in {@link ApplicationFields} that can be used to search for applications.
 */
const applicationSearchableFields = [
  'Discord ID',
  'Email',
] as const satisfies readonly (keyof ApplicationFields)[];

export type ApplicationSearchableFields = (typeof applicationSearchableFields)[number];

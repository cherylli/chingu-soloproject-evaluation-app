import {
  SoloProjectTier,
  VoyageRole,
} from '@/types/SoloProjectTypes';

export type VoyageSignup = {
  id: string;
  fields: VoyageSignupFields;
};

export type VoyageSignupTeamNameType =
  | 'Tier 1'
  | 'Tier 2'
  | 'Tier 3';

export type VoyageSignupFields = {
  Timestamp: string;
  Email: string;
  'Discord Name': string;
  'GitHub ID': string;
  'Evaluation Status (from Solo Project Link)': string;
  Status: string;
  'Status Comment': string;
  Voyage: string;
  'Team Name': string; // Tier generated google form automation
  'Team No.': string;
  Timezone: string;
  Role: VoyageRole;
  'Role Type': string;
  Tier: SoloProjectTier; // original signup tier?
  'Info to Share': string;
  'Application Link': string; // might not need -> fetch in user instead
  'Solo Project Link': string; // might not need  -> fetch in user instead
  'Confirmation Form Completed': boolean;
  'Showcase Name Permission?': boolean;
  'Discord ID': string; // might not need -> fetch in user instead
  'Product (from Most Recent Subscriptions & Product Sales)': string;
  // check solo project tier
  'Solo Project Exceptions': string;
  'Solo Project Tier (Lookup)': string; // should match "Team Name"
};

// Search Fields
const voyageSignupSearchableFields = [
  'Discord ID',
  'Email',
] as const satisfies readonly (keyof VoyageSignupFields)[];

export type VoyageSignupSearchableFields =
  (typeof voyageSignupSearchableFields)[number];

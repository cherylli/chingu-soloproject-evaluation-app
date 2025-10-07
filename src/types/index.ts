import {
  Application,
  ApplicationFields,
  ApplicationSearchableFields,
} from '@/types/ApplicationTypes';
import {
  CheckIn,
  CheckInFields,
} from '@/types/CheckinTypes';
import { FinanceRevenueSearchableFields } from '@/types/FinanceRevenueType';
import {
  SoloProjectFields,
  SoloProjectSearchableFields,
  SoloProjectSubmission,
} from '@/types/SoloProjectTypes';
import {
  VoyageSignup,
  VoyageSignupFields,
  VoyageSignupSearchableFields,
} from '@/types/VoyageSignupTypes';

type ActionSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

type ActionFailure = {
  success: false;
  message: string;
};

export type ActionResponse<T> =
  | ActionSuccess<T>
  | ActionFailure;

// TODO: update all services to use ActionResponse

export type SearchableFields =
  | ApplicationSearchableFields
  | VoyageSignupSearchableFields
  | SoloProjectSearchableFields
  | FinanceRevenueSearchableFields;

export type AirtableData =
  | SoloProjectSubmission
  | VoyageSignup
  | Application
  | CheckIn;

export type AirtableFields =
  | SoloProjectFields
  | VoyageSignupFields
  | ApplicationFields
  | CheckInFields;

export type Context =
  | 'solo-project'
  | 'voyage-signup'
  | 'voyage-checkin'
  | 'application'
  | 'schedule';

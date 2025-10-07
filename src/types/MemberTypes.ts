import { Application } from '@/types/ApplicationTypes';
import { FinanceRevenue } from '@/types/FinanceRevenueType';
import { SoloProjectSubmission } from '@/types/SoloProjectTypes';
import { VoyageSignup } from '@/types/VoyageSignupTypes';

export type MemberDetailsType = {
  applications: Application[];
  soloProjects: SoloProjectSubmission[];
  voyageSignups: VoyageSignup[];
  payments: FinanceRevenue[];
};

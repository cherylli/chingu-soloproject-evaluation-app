import { Application } from '@/types/ApplicationTypes';
import { SoloProjectSubmission } from '@/types/SoloProjectTypes';
import { VoyageSignup } from '@/types/VoyageSignupTypes';

export type MemberDetailsType = {
  applications: Application[];
  soloProjects: SoloProjectSubmission[];
  voyageSignups: VoyageSignup[];
};

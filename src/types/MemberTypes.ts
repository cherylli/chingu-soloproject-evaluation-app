import { Application } from '@/types/ApplicationTypes';
import { SoloProjectSubmission } from '@/types/SoloProjectTypes';
import { VoyageSignup } from '@/types/VoyageSignupTypes';

export type MemberDetails = {
  applications: Application[];
  soloProjects: SoloProjectSubmission[];
  voyageSignups: VoyageSignup[];
};

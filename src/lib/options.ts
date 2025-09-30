import { EvaluationStatus } from '@/types/SoloProjectTypes';

export const evalStatusValues: {
  label: string;
  value: EvaluationStatus;
}[] = [
  { label: 'Waiting Eval', value: 'Waiting Eval' },
  { label: 'Not in Discord', value: 'Not in Discord' },
  {
    label: 'Requested Changes',
    value: 'Requested Changes',
  },
  { label: 'Passed', value: 'Passed' },
];

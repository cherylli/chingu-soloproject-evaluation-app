// since application form is detached from solo project form now, there's a new "Role" column

import { parseRole } from '@/lib/parseRole';
import { SoloProjectFields } from '@/types/SoloProjectTypes';

export const getRole = (fields: SoloProjectFields) => {
  return fields['Role'] || parseRole(fields['Voyage Role (from Applications link)']);
};

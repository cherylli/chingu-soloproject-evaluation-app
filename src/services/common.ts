import {
  applicationTable,
  checkinTable,
  table,
  transformApplicationData,
  transformCheckinData,
  transformData,
  transformVoyageSignupData,
  voyageSignupTable,
} from '@/lib/airtable';
import { ActionResponse } from '@/types';
import { Application } from '@/types/ApplicationTypes';
import { CheckIn } from '@/types/CheckinTypes';
import { SoloProjectSubmission } from '@/types/SoloProjectTypes';
import { VoyageSignup } from '@/types/VoyageSignupTypes';
import { FieldSet, Records } from 'airtable';

const tableMap = {
  soloProject: {
    atTable: table,
    transformFn: transformData as (r: Records<FieldSet>) => SoloProjectSubmission[],
  },
  application: {
    atTable: applicationTable,
    transformFn: transformApplicationData as (r: Records<FieldSet>) => Application[],
  },
  checkin: {
    atTable: checkinTable,
    transformFn: transformCheckinData as (r: Records<FieldSet>) => CheckIn[],
  },
  voyageSignup: {
    atTable: voyageSignupTable,
    transformFn: transformVoyageSignupData as (r: Records<FieldSet>) => VoyageSignup[],
  },
};

export const getRecordsByFilter = async <T extends keyof typeof tableMap>(
  table: T,
  filter: () => string
): Promise<ActionResponse<ReturnType<(typeof tableMap)[T]['transformFn']>>> => {
  try {
    const records = await tableMap[table].atTable
      .select({
        filterByFormula: filter(),
      })
      .all();

    return {
      success: true,
      data: tableMap[table].transformFn(records) as ReturnType<(typeof tableMap)[T]['transformFn']>,
      message: `Successfully get all ${table} records.`,
    };
  } catch (e) {
    throw e;
  }
};

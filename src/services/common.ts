import {
  applicationTable,
  checkinTable,
  financeRevenueTable,
  soloProjectTable,
  transformApplicationRecords,
  transformCheckinRecords,
  transformFinanceRevenueRecords,
  transformSoloProjectRecords,
  transformVoyageSignupRecords,
  voyageSignupTable,
} from '@/lib/airtable';
import { ActionResponse } from '@/types';
import { Application } from '@/types/ApplicationTypes';
import { CheckIn } from '@/types/CheckinTypes';
import { FinanceRevenue } from '@/types/FinanceRevenueType';
import { SoloProjectSubmission } from '@/types/SoloProjectTypes';
import { VoyageSignup } from '@/types/VoyageSignupTypes';
import { FieldSet, Records } from 'airtable';

const tableMap = {
  soloProject: {
    atTable: soloProjectTable,
    transformFn: transformSoloProjectRecords as (
      r: Records<FieldSet>
    ) => SoloProjectSubmission[],
  },
  application: {
    atTable: applicationTable,
    transformFn: transformApplicationRecords as (
      r: Records<FieldSet>
    ) => Application[],
  },
  checkin: {
    atTable: checkinTable,
    transformFn: transformCheckinRecords as (
      r: Records<FieldSet>
    ) => CheckIn[],
  },
  voyageSignup: {
    atTable: voyageSignupTable,
    transformFn: transformVoyageSignupRecords as (
      r: Records<FieldSet>
    ) => VoyageSignup[],
  },
  financeRevenue: {
    atTable: financeRevenueTable,
    transformFn: transformFinanceRevenueRecords as (
      r: Records<FieldSet>
    ) => FinanceRevenue[],
  },
};

export const getRecordsByFilter = async <
  T extends keyof typeof tableMap,
>(
  table: T,
  filter: () => string
): Promise<
  ActionResponse<
    ReturnType<(typeof tableMap)[T]['transformFn']>
  >
> => {
  try {
    const records = await tableMap[table].atTable
      .select({
        filterByFormula: filter(),
      })
      .all();

    return {
      success: true,
      data: tableMap[table].transformFn(
        records
      ) as ReturnType<(typeof tableMap)[T]['transformFn']>,
      message: `Successfully get all ${table} records.`,
    };
  } catch (e) {
    throw e;
  }
};

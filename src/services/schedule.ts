'use server';

import { scheduleTable, transformScheduleRecords } from '@/lib/airtable';
import { ActionResponse } from '@/types';
import { Schedule } from '@/types/ScheduleTypes';

export const getSchedule = async (): Promise<ActionResponse<Schedule[]>> => {
  try {
    const records = await scheduleTable
      .select({
        sort: [
          {
            field: 'Start Date',
            direction: 'desc',
          },
        ],
      })
      .all();

    return {
      success: true,
      message: 'Successfully get Voyage Schedule from airtable',
      data: transformScheduleRecords(records),
    };
  } catch (e) {
    throw new Error(`Failed to get schedule data. Error: ${e}`);
  }
};

// get voyageSchedules only
export const getVoyageSchedule = async (): Promise<ActionResponse<Schedule[]>> => {
  try {
    const records = await scheduleTable
      .select({
        sort: [
          {
            field: 'Start Date',
            direction: 'desc',
          },
        ],
        filterByFormula: `AND({Type} = "Voyage", {Name} != "V999")`,
      })
      .all();

    return {
      success: true,
      message: 'Successfully get Voyage Schedule from airtable',
      data: transformScheduleRecords(records),
    };
  } catch (e) {
    throw new Error(`Failed to get schedule data. Error: ${e}`);
  }
};

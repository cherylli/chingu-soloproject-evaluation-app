'use server';
import { options } from '@/app/api/auth/[...nextauth]/options';
import {
  createOrFilter,
  soloProjectTable,
  transformSoloProjectRecord,
  transformSoloProjectRecords,
} from '@/lib/airtable';
import { getDate } from '@/lib/getDate';
import { ActionResponse } from '@/types';
import { type SoloProjectSearchableFields, SoloProjectSubmission } from '@/types/SoloProjectTypes';
import { FieldSet } from 'airtable';
import AirtableError from 'airtable/lib/airtable_error';
import { getServerSession } from 'next-auth';

export const getAllSoloProjects = async (): Promise<SoloProjectSubmission[]> => {
  const records = await soloProjectTable.select({}).firstPage();
  return transformSoloProjectRecords(records);
};

export const getSoloProjectsByStatus = async (status: string): Promise<SoloProjectSubmission[]> => {
  const filter = `{Evaluation Status} = "${status}"`;
  const records = await soloProjectTable
    .select({
      filterByFormula: filter,
      recordMetadata: ['commentCount'],
      sort: [
        {
          field: 'Timestamp',
          direction: 'desc',
        },
      ],
    })
    .firstPage();
  return transformSoloProjectRecords(records);
};

export const getSoloProjectById = async (id: string): Promise<SoloProjectSubmission> => {
  const record = await soloProjectTable.find(id);
  return transformSoloProjectRecord(record);
};

/**
 * Retrieves all solo projects for a Chingu member identified by Discord ID and/or email
 * @param {string} discordId - Member's Discord ID
 * @param {string} email - Member's email address
 * @returns {Promise<SoloProjectSubmission[]>} Array of member's submissions
 * @throws {Error} If neither discordId nor email is provided
 */

// TODO: rename to getAllSoloProjectsByMember to avoid confusion
// TODO: refactor this like getAllVoyageSignupsByMember
export const getAllSoloProjectsByUser = async (
  discordId?: string,
  email?: string
): Promise<SoloProjectSubmission[]> => {
  if (!discordId && !email) {
    throw new Error('Either discordId or email must be provided.');
  }

  const conditions: { field: SoloProjectSearchableFields; value: string }[] = [];

  if (discordId) {
    conditions.push({ field: 'Discord ID', value: discordId });
  }
  if (email) {
    conditions.push({ field: 'Email', value: email });
  }

  const filter = createOrFilter(conditions);

  const records = await soloProjectTable
    .select({
      filterByFormula: filter,
    })
    .all();
  return transformSoloProjectRecords(records);
};

export const setEvaluatorOnDb = async (
  id: string
): Promise<ActionResponse<SoloProjectSubmission>> => {
  const sessionData = await getServerSession(options);
  try {
    const record = await soloProjectTable.find(id);
    if (record.fields['Evaluator']) {
      return {
        success: false,
        message: `${record.fields['Evaluator']} is already evaluating this solo project submission. `,
      };
    } else {
      if (sessionData) {
        const updatedRecord = await soloProjectTable.update([
          {
            id,
            fields: {
              'Evaluation Date': getDate(),
              Evaluator: sessionData.user.evaluatorEmail,
            },
          },
        ]);
        return {
          success: true,
          message: `Evaluator is set to ${updatedRecord[0].fields['Evaluator']}.`,
          data: transformSoloProjectRecords(updatedRecord)[0],
        };
      }
      return {
        success: false,
        message: `You're not logged in.`,
      };
    }
  } catch (e) {
    if (e instanceof AirtableError) {
      if (e.error === 'INVALID_MULTIPLE_CHOICE_OPTIONS')
        return {
          success: false,
          message: `Airtable error: Your email ${sessionData?.user.evaluatorEmail} has not been added to the evaluator list. Please contact an administrator.`,
        };
    }
    return {
      success: false,
      message: `Error: ${e}`,
    };
  }
};

export const removeEvaluatorOnDb = async (
  id: string
): Promise<ActionResponse<SoloProjectSubmission>> => {
  const sessionData = await getServerSession(options);
  try {
    if (sessionData) {
      const updatedRecord = await soloProjectTable.update([
        {
          id,
          fields: {
            Evaluator: '',
          },
        },
      ]);
      return {
        success: true,
        message: `Evaluator is removed.`,
        data: transformSoloProjectRecords(updatedRecord)[0],
      };
    }
    return {
      success: false,
      message: `You're not logged in.`,
    };
  } catch (e) {
    return {
      success: false,
      message: `Error: ${e}`,
    };
  }
};

export const updateSoloProjectById = async (
  id: string,
  fields: FieldSet
): Promise<ActionResponse<SoloProjectSubmission>> => {
  try {
    const updatedRecord = await soloProjectTable.update([
      {
        id,
        fields,
      },
    ]);
    return {
      success: true,
      message: `update success`,
      data: transformSoloProjectRecords(updatedRecord)[0],
    };
  } catch (e) {
    return {
      success: false,
      message: `Error: ${e}`,
    };
  }
};

// return all solo projects with tier= "*Tier1", "*Tier2" or "*Tier3" (tier suggestions by evaluators),
// which indicates the user picked a different tier
export const getTierMismatchedSoloProjects = async (): Promise<SoloProjectSubmission[]> => {
  const filter = `OR({Tier} = "*Tier1", {Tier} = "*Tier2", {Tier} = "*Tier3")`;
  const records = await soloProjectTable
    .select({
      filterByFormula: filter,
    })
    .all();
  return transformSoloProjectRecords(records);
};

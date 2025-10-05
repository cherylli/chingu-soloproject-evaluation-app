'use server';

import { createOrFilter } from '@/lib/airtable';
import { getApplicationsByMember } from '@/services/applications';
import { getRecordsByFilter } from '@/services/common';
import { getRevenueRecordsbyMember } from '@/services/revenue';
import { getAllSoloProjectsByMember } from '@/services/soloProjects';
import { getAllVoyageSignupsByMember } from '@/services/voyages';
import { ActionResponse, SearchableFields } from '@/types';
import { MemberDetailsType } from '@/types/MemberTypes';

/**
 * Given member's discord ID, find all emails associated with this discordID
 * 1. Members submitted multiple forms with different emails
 *
 * @param {string} discordId - The Discord ID of the member to retrieve emails for.
 * @returns {Promise<string[]>} A promise that resolves to an array of unique email addresses.
 */
export const getMemberEmailsByDiscordId = async (
  discordId: string
): Promise<ActionResponse<string[]>> => {
  const emails: Set<string> = new Set<string>();
  // get application,
  // there should only be 1 application per person, but sometimes people sign up multiple times with different emails
  const applications =
    await getApplicationsByMember(discordId);

  if (applications.success) {
    applications.data
      .map((app) => app.fields.Email)
      .forEach((email) => emails.add(email));
  }
  // get solo project(s) using discordID
  const soloProjects =
    await getAllSoloProjectsByMember(discordId);

  if (soloProjects.success)
    soloProjects.data
      .map((sp) => sp.fields.Email)
      .forEach((email) => emails.add(email));

  // get voyage signups(s)
  const voyageSignups =
    await getAllVoyageSignupsByMember(discordId);

  if (voyageSignups.success) {
    // push unique emails
    voyageSignups.data
      .map((vs) => vs.fields.Email)
      .forEach((email) => emails.add(email));
  }

  return {
    success: true,
    data: [...emails],
    message: `Successfully get member emails by discordId.`,
  };
};

export const getMemberDetailsByDiscordId = async (
  discordId: string
): Promise<ActionResponse<MemberDetailsType>> => {
  // create an array of emails to re-search all the tables
  // some members have used multiple emails

  try {
    const allRecords: MemberDetailsType = {
      applications: [],
      soloProjects: [],
      voyageSignups: [],
      payments: [],
    };

    // get all emails using the given discord Id
    const emails =
      await getMemberEmailsByDiscordId(discordId);

    // search again with all emails (even when there's only 1 email) for cases like
    // 1. records with different emails,
    // 2. records with no discordId

    const conditions = [
      {
        field: 'Discord ID' as SearchableFields,
        value: discordId,
      },
    ];
    if (emails.success) {
      emails.data.forEach((email) => {
        conditions.push({
          field: 'Email' as SearchableFields,
          value: email,
        });
      });
    }
    const soloProjects = await getRecordsByFilter(
      'soloProject',
      () => createOrFilter(conditions)
    );

    if (soloProjects.success) {
      allRecords.soloProjects = soloProjects.data;
    }

    const applications = await getRecordsByFilter(
      'application',
      () => createOrFilter(conditions)
    );

    // subscriptions, donation or products
    // search by discordId, rely on airtable records being correct
    const payments = await getRevenueRecordsbyMember(
      discordId,
      emails?.success ? emails.data[0] : undefined
    );

    if (payments.success) {
      allRecords.payments = payments.data;
    }

    if (applications.success) {
      allRecords.applications = applications.data;
    }

    const voyageSignups = await getRecordsByFilter(
      'voyageSignup',
      () => createOrFilter(conditions)
    );

    if (voyageSignups.success) {
      allRecords.voyageSignups = voyageSignups.data;
    }

    // no record found for the given discordId
    const isAllEmpty = Object.values(allRecords).every(
      (arr) => Array.isArray(arr) && arr.length === 0
    );

    if (isAllEmpty) {
      return {
        success: false,
        message: `No record found for discord Id ${discordId}.`,
      };
    }

    return {
      success: true,
      data: allRecords,
      message: `Successfully get member details by discordId.`,
    };
  } catch (e) {
    throw new Error(
      `Failed to get member details. Error: ${e}`
    );
  }
};

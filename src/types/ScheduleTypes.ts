export type Schedule = {
  id: string;
  fields: ScheduleFields;
};

export type EventTypes = 'Voyage' | 'Event';

export type ScheduleFields = {
  Name: string;
  Type: EventTypes;
  'Start Date': string;
  'End Date': string;
  'Solo Project Deadline': string;
};

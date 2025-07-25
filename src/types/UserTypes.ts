/**
 * roles from airtable
 * (for this app, we only care about "Chingu admin", and "Evaluator" roles)
 * Users without "Chingu admin" or "Evaluator" roles will just have an empty role array []
 * Anyone with inactive status on airtable will be denied access
 * User roles are only for app users, not to be confused with Chingu members / participants
 */
export type ChinguRole =
    | "Chingu admin"
    | "Discord admin"
    | "Facilitator"
    | "Evaluator"

export type ChinguAppRole =
    |  "admin"
    |  "evaluator"

export type StatusType =
    | "Active"
    | "Inactive"
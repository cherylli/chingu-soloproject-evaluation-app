/**
 * roles from airtable
 * (for this app, we only care about "Chingu admin", and "Evaluator" roles)
 * Users without "Chingu admin" or "Evaluator" roles will just have an empty role array []
 * Anyone with inactive status on airtable will be denied access
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
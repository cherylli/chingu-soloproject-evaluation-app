/**
 * roles from airtable
 * (for this app, we only care about "Chingu admin" role)
 * role(s) will be added for volunteer evaluators who are not admins
 * "Evaluator" is the default role for anyone not an admin
 */
export type ChinguRole =
    | "Chingu admin"
    | "Discord admin"
    | "Facilitator"

export type ChinguAppRole =
    |  "admin"
    |  "evaluator"
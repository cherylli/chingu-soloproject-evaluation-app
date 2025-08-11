For development purpose, 2 test airtable tables need to have the following soloProjectFields

### Solo project submission soloProjectTable

```ts
export type SoloProjectFields = {
  'Discord Name': string;
  'GitHub ID': string;
  Timestamp: Date | string;
  Tier: string;
  'GitHub Repo URL': string;
  'Deployed App URL': string;
  'Evaluation Status': EvaluationStatus;
  Evaluator: string;
  'Evaluation Feedback': string;
  Instructions: string;
  'Addl. Comments': string;
  'Voyage Role (from Applications link)': VoyageRole;
};

export type EvaluationStatus =
  | 'Waiting Eval'
  | 'Passed'
  | 'Not in Discord'
  | 'Requested Changes'
  | 'Pending'
  | 'No Pass';

export type VoyageRole =
  | 'Software Developer'
  | 'UI / UX Designer'
  | 'Data Scientist'
  | 'Product Owner';
```

### User soloProjectTable

```ts
// These 3 tables soloProjectFields are used to check if user is authorised to use the app
"github email": Single line text|null
"evaluator email": Single line text|null
"Role": (Multiple select) ChinguRole | null

export type ChinguRole =
    | "Chingu admin"
    | "Discord admin"
    | "Facilitator"

export type ChinguAppRole =
    |  "admin"
    |  "evaluator"
```

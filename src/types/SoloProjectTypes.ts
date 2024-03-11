export type Submission = {
    id: string
    commentCount: number
    fields: FilteredFields
}

export type EvaluationStatus =
    | "Waiting Eval"
    | "Passed"
    | "Not in Discord"
    | "Requested Changes"
    | "Pending"
    | "No Pass"

export type VoyageRole =
    | "Software Developer"
    | "UI / UX Designer"
    | "Data Scientist"
    | "Product Owner"
    | "unknown"

export type FilteredFields = {
    "Email": string
    "Discord Name": string
    "GitHub ID": string
    "Timestamp": Date | string
    "Tier": string
    "GitHub Repo URL": string
    "Deployed App URL": string
    "Evaluation Status":EvaluationStatus
    "Evaluator": string
    "Evaluation Feedback": string
    "Instructions": string
    "Addl. Comments": string
    "Voyage Role (from Applications link)": VoyageRole
    "Discord ID": string
}


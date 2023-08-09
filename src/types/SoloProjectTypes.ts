export type Submission = {
    id: string
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

export type FilteredFields = {
    "Discord Name": string
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
}


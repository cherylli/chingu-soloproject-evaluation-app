export type Submission = {
    id: string
    fields: FilteredFields
}

export type FilteredFields = {
    "Discord Name": string
    "Timestamp": Date
    "Tier": string
    "GitHub Repo URL": string
    "Deployed App URL": string
    "Evaluation Status":
        | "Waiting Eval"
        | "Passed"
        | "Not in Discord"
        | "Requested Changes"
        | "Pending"
        | "No Pass"
    "Evaluator": string
    "Evaluation Feedback": string
    "Voyage Role (from Applications link)":
        | "Software Developer"
        | "UI / UX Designer"
        | "Data Scientist"
        | "Product Owner"
}


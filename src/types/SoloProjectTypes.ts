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
    | "Developer"
    | "UI / UX Designer"
    | "UI/UX Designer"
    | "Data Scientist"
    | "Product Owner"
    | "Scrum Master"
    | "unknown"

export type SoloProjectTier =
    | "Tier 1 - Beginner (ONLY for Developer role)"
    | "Tier 2  - Intermediate (All roles)"
    | "Tier 3 - Experienced (All roles)"
    | "*Tier1"
    | "*Tier2"
    | "*Tier3"

type BasicFields = {
    "Email": string
    "Discord Name": string
    "GitHub ID": string
    "Timestamp": Date | string
    "Tier": SoloProjectTier
    "GitHub Repo URL": string
    "Deployed App URL": string
    "UI/UX Project URL": string
    "Evaluation Status":EvaluationStatus
    "Evaluator": string
    "Evaluation Feedback": string
    "Instructions": string
    "Addl. Comments": string
    "Voyage Role (from Applications link)": VoyageRole
    "Role Type": string
    "Role": VoyageRole
    "Discord ID": string
}

type POFields = {
    "PO: Certification": string,
    "PO: Highest Certification": string,
    "PO: Participated in Project as PO": string,
    "PO: Project Details": string,
    "PO05": string,
    "PO06": string,
    "PO07": string,
    "PO08": string,
    "PO09": string,
    "PO10": string,
    "PO11": string,
    "PO12": string,
    "PO13": string,
    "PO14": string,
    "PO15": string,
    "PO16": string,
    "PO17": string,
    "PO18": string,
    "PO19": string,
    "PO20": string,
    "PO21": string,
    "PO Product Backlog URL": string,
}

type SMFields = {
    "SM: Certification": string,
    "SM: Highest Certification": string,
    "SM: Participated in Project as SM": string,
    "SM: Project Details": string,
    "SM05": string,
    "SM06": string,
    "SM07": string,
    "SM08": string,
    "SM09": string,
    "SM10": string,
    "SM11": string,
    "SM12": string,
    "SM13": string,
    "SM14": string,
    "SM15": string,
    "SM16": string,
    "SM17": string,
    "SM18": string,
    "SM19": string,
    "SM20": string,
    "SM21": string,
    "SM22": string,
}

export type FilteredFields = BasicFields & POFields & SMFields

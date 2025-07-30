import {Application, ApplicationSearchableFields} from "@/types/ApplicationTypes";
import {VoyageSignup, VoyageSignupSearchableFields} from "@/types/VoyageSignupTypes";
import {SoloProjectSearchableFields, Submission} from "@/types/SoloProjectTypes";
import {CheckIn} from "@/types/CheckinTypes";

type ActionSuccess<T> = {
    success: true
    message: string
    data: T
}

type ActionFailure = {
    success: false
    message: string
}

export type ActionResponse<T> = ActionSuccess<T> | ActionFailure;

// TODO: update all services to use ActionResponse

export type SearchableFields =
    | ApplicationSearchableFields
    | VoyageSignupSearchableFields
    | SoloProjectSearchableFields

export type AirtableData =
    | Submission
    | VoyageSignup
    | Application
    | CheckIn

export type Context =
    |"solo-project"
    |"voyage-signup"
    |"voyage-checkin"
    |"application"
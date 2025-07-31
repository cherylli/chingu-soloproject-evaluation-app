import {Application, ApplicationFields, ApplicationSearchableFields} from "@/types/ApplicationTypes";
import {VoyageSignup, VoyageSignupFields, VoyageSignupSearchableFields} from "@/types/VoyageSignupTypes";
import {FilteredFields, SoloProjectSearchableFields, Submission} from "@/types/SoloProjectTypes";
import {CheckIn, CheckInFields} from "@/types/CheckinTypes";

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

export type AirtableFields =
    | FilteredFields
    | VoyageSignupFields
    | ApplicationFields
    | CheckInFields

export type Context =
    |"solo-project"
    |"voyage-signup"
    |"voyage-checkin"
    |"application"
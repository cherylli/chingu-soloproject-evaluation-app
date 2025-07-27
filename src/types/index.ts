import {ApplicationSearchableFields} from "@/types/ApplicationTypes";
import {VoyageSignupSearchableFields} from "@/types/VoyageSignupTypes";
import {SoloProjectSearchableFields} from "@/types/SoloProjectTypes";

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
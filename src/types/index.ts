import {Submission} from "@/types/SoloProjectTypes";

export type ActionResponse = {
    success: boolean
    message: string
}

export type ActionResponseWithData = {
    data: Submission
} & ActionResponse
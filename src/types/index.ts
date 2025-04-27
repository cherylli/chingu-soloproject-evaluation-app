import {Submission} from "@/types/SoloProjectTypes";

export type ActionResponse = {
    success: boolean
    message: string
    data?: Submission
}
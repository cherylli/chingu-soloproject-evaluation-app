import {
    getAllSoloProjectsByUser,
    getSoloProjectById,
    setEvaluatorOnDb,
    removeEvaluatorOnDb,
    updateSoloProjectById
} from "@/services/soloProjects";
import ProjectSubmissionDetail from "@/components/soloprojects/details/BaseDetails";
import {ActionResponse} from "@/types";
import Comments from "@/components/comments";
import FeedbackContainer from "@/components/feedback/FeedbackContainer";
import CompactList from "@/components/soloprojects/CompactList";

const SoloProjectPage = async ({params}: { params: { id: string } }) => {
    const record = await getSoloProjectById(params.id)
    const projects = await getAllSoloProjectsByUser(record.fields["Discord ID"], record.fields.Email)
    const handleSave = async (evalFeedback: string, evalStatus: string): Promise<ActionResponse> => {
        'use server'
        return await updateSoloProjectById(params.id, {
            "Evaluation Feedback": evalFeedback,
            "Evaluation Status":evalStatus,
        })
    }
    const handleSetEvaluator = async (): Promise<ActionResponse>  => {
        'use server'
        return await setEvaluatorOnDb(params.id)
    }
    const handleRemoveEvaluator = async (): Promise<ActionResponse> => {
        'use server'
        return await removeEvaluatorOnDb(params.id)
    }
    return(
        <div className="flex flex-col lg:flex-row-reverse justify-between h-[calc(100vh-110px)]">
            <div className="lg:w-1/2 lg:overflow-y-auto">
                {projects.length>1 && <CompactList records={projects}/>}
                <ProjectSubmissionDetail
                    record={record}
                    handleSave={handleSave}
                    handleSetEvaluator={handleSetEvaluator}
                    handleRemoveEvaluator={handleRemoveEvaluator}
                />
                <Comments recordId={params.id}/>
            </div>
                <div className="hidden lg:block lg:w-1/2 lg:max-h-screen lg:overflow-y-auto">
                    <FeedbackContainer discordName={record.fields["Discord Name"]}/>
                </div>
        </div>
    )
}

export default SoloProjectPage
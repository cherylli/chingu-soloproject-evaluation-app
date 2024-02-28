import {getSoloProjectById, setEvaluatorOnDb, updateSoloProjectById} from "@/services/soloProjects";
import ProjectSubmissionDetail from "@/components/soloprojects/Details";
import {ActionResponse} from "@/types";
import Comments from "@/components/comments";
import FeedbackContainer from "@/components/feedback/FeedbackContainer";

const SoloProjectPage = async ({params}: { params: { id: string } }) => {
    const record = await getSoloProjectById(params.id)
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
    return(
        <div className="flex flex-col lg:flex-row-reverse justify-between h-screen">
            <div className="lg:w-1/2 lg:overflow-y-auto">
                <ProjectSubmissionDetail
                    record={record}
                    handleSave={handleSave}
                    handleSetEvaluator={handleSetEvaluator} />
                {/* Move to inside project detail page */}
                <Comments recordId={params.id}/>
            </div>
            <div className="hidden lg:block lg:w-1/2 lg:max-h-screen lg:overflow-y-auto">
                <FeedbackContainer discordName={record.fields["Discord Name"]}/>
            </div>
        </div>
    )
 }

 export default SoloProjectPage
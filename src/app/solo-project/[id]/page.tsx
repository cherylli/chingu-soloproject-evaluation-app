import {getSoloProjectById, setEvaluatorOnDb, updateSoloProjectById} from "@/services/soloProjects";
import ProjectSubmissionDetail from "@/components/soloprojects/Details";
import {ActionResponse} from "@/types";
import Comments from "@/components/comments";

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
        <div>
            <ProjectSubmissionDetail
                record={record}
                handleSave={handleSave}
                handleSetEvaluator={handleSetEvaluator} />
            <Comments recordId={params.id}/>
        </div>
    )
 }

 export default SoloProjectPage
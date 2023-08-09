import {getSoloProjectById, setEvaluatorOnDb, updateSoloProjectById} from "@/services/soloProjects";
import ProjectSubmissionDetail from "@/components/soloprojects/Details";

const SoloProjectPage = async ({params}: { params: { id: string } }) => {
    const record = await getSoloProjectById(params.id)
    const handleSave = async (evalFeedback: string, evalStatus: string) => {
        'use server'
        const updatedRecord = await updateSoloProjectById(params.id, {
            "Evaluation Feedback": evalFeedback,
            "Evaluation Status":evalStatus,
        })
        // TODO: display this somewhere
        // console.log(updatedRecord)
    }
    const handleSetEvaluator = async () => {
        'use server'
        const res = await setEvaluatorOnDb(params.id)
        // TODO: display this somewhere
        // console.log(res)
    }
    return(
        <div>
            <ProjectSubmissionDetail
                record={record}
                handleSave={handleSave}
                handleSetEvaluator={handleSetEvaluator} />
        </div>
    )
 }

 export default SoloProjectPage
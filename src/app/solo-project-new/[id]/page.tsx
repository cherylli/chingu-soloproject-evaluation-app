import {getSoloProjectById} from "@/services/soloProjects";
import ProjectSubmissionDetail from "@/components/soloprojects/Details";

const SoloProjectPage = async ({params}: { params: { id: string } }) => {
    const record = await getSoloProjectById(params.id)
    const handleSave = async (evalNotes: string, evalStatus: string) => {
        'use server'
        console.log("save...", evalNotes, evalStatus)
    }
    const handleSetEvaluator = async () => {
        'use server'
        // TODO: evaluator email will be obtained from auth context (to be setup)
        console.log("set Evaluator")
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
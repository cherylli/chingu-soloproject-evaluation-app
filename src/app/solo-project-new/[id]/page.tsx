import {getSoloProjectById} from "@/services/soloProjects";
import {EvaluationStatus, FilteredFields} from "@/types/SoloProjectTypes";
import ProjectSubmissionDetail from "@/components/soloprojects/Details";

const SoloProjectPage = async ({params}: { params: { id: string } }) => {
    const record = await getSoloProjectById(params.id)
    const handleSave = async (evalNotes: string, evalStatus: string) => {
        'use server'
        console.log("save...", evalNotes, evalStatus)
    }
    const handleSetEvaluator = async (evaluator:string) => {
        'use server'
        console.log("set Evaluator", evaluator)
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
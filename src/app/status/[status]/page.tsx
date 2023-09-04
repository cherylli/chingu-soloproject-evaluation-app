import {EvaluationStatus} from "@/types/SoloProjectTypes";
import {getSoloProjectsByStatus} from "@/services/soloProjects";
import ProjectSubmissionList from "@/components/soloprojects/List";

const statusMap = new Map<string,EvaluationStatus>([
    ["waiting-eval", "Waiting Eval"],
    ["not-in-discord", "Not in Discord"],
    ["requested-changes", "Requested Changes"]
])

const ListByStatus = async ({params}:{params:{status:string}}) => {
    if(!statusMap.has(params.status)){
        return <div>
            Status not found
        </div>
    }
    const records = await getSoloProjectsByStatus(statusMap.get(params.status)!)
    return(
        <>
            <h1 className="text-center text-3xl">
                {statusMap.get(params.status)}
            </h1>
            <ProjectSubmissionList records={records}/>
        </>
    )
 }
 
 export default ListByStatus
import {EvaluationStatus} from "@/types/SoloProjectTypes";
import {getSoloProjectsByStatus} from "@/services/soloProjects";
import ProjectSubmissionList, {ProjectSubmissionListSkeleton} from "@/components/soloprojects/List";
import {Suspense} from "react";
import FetchProjects from "@/components/soloprojects/FetchProjects";

const statusMap = new Map<string,EvaluationStatus>([
    ["waiting-eval", "Waiting Eval"],
    ["not-in-discord", "Not in Discord"],
    ["requested-changes", "Requested Changes"],
    ["passed", "Passed"]
])

const ListByStatus = async (props:{params: Promise<{status:string}>}) => {
    const params = await props.params;
    if(!statusMap.has(params.status)){
        return <div>
            Status not found
        </div>
    }
    return(
        <>
            <h1 className="text-center text-3xl mb-5">
                {statusMap.get(params.status)}
            </h1>
            <Suspense fallback={<ProjectSubmissionListSkeleton/>}>
                <FetchProjects
                    status={statusMap.get(params.status)!}
                />
            </Suspense>
        </>
    )
}
 
 export default ListByStatus

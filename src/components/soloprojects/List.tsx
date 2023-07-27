import SoloProjectsListItem from "@/components/soloprojects/ListItem";
import {Submission} from "@/types/SoloProjectTypes";

const ProjectSubmissionList = ({records}:{records:Submission[]}) => {
    return(
        <table className="table-auto">
            <thead>
                <tr>
                    <th className="border-b-2">Discord name</th>
                    <th className="border-b-2">Tier</th>
                    <th className="border-b-2">Evaluator</th>
                </tr>
            </thead>
            <tbody>
                {records.map(r=>(
                    <SoloProjectsListItem key={r.id} fields={r.fields} id={r.id} />
                ))}
            </tbody>
        </table>
    )
 }

 export default ProjectSubmissionList
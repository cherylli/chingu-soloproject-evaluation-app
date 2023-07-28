import SoloProjectsListItem from "@/components/soloprojects/ListItem";
import {Submission} from "@/types/SoloProjectTypes";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const ProjectSubmissionList = ({records}:{records:Submission[]}) => {
    return(
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="border-b-2">Discord name</TableHead>
                    <TableHead className="border-b-2">Role</TableHead>
                    <TableHead className="border-b-2">Tier</TableHead>
                    <TableHead className="border-b-2">Evaluator</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {records.map(r=>(
                    <SoloProjectsListItem key={r.id} fields={r.fields} id={r.id} />
                ))}
            </TableBody>
        </Table>
    )
 }

 export default ProjectSubmissionList
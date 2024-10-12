import SoloProjectsListItem from "@/components/soloprojects/ListItem";
import {Submission} from "@/types/SoloProjectTypes";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Skeleton} from "@/components/ui/skeleton";

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
                    <SoloProjectsListItem
                        key={r.id}
                        fields={r.fields}
                        commentCount={r.commentCount}
                        id={r.id} />
                ))}
            </TableBody>
        </Table>
    )
}
export default ProjectSubmissionList

export const ProjectSubmissionListSkeleton = () => {
    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="border-b-2">Discord name</TableHead>
                <TableHead className="border-b-2">Role</TableHead>
                <TableHead className="border-b-2">Tier</TableHead>
                <TableHead className="border-b-2">Evaluator</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableCell><Skeleton className="h-6" /></TableCell>
                <TableCell><Skeleton className="h-6" /></TableCell>
                <TableCell><Skeleton className="h-6" /></TableCell>
                <TableCell><Skeleton className="h-6" /></TableCell>
            </TableRow>
            <TableRow>
                <TableCell><Skeleton className="h-6" /></TableCell>
                <TableCell><Skeleton className="h-6" /></TableCell>
                <TableCell><Skeleton className="h-6" /></TableCell>
                <TableCell><Skeleton className="h-6" /></TableCell>
            </TableRow>
            <TableRow>
                <TableCell><Skeleton className="h-6" /></TableCell>
                <TableCell><Skeleton className="h-6" /></TableCell>
                <TableCell><Skeleton className="h-6" /></TableCell>
                <TableCell><Skeleton className="h-6" /></TableCell>
            </TableRow>
        </TableBody>
    </Table>
}

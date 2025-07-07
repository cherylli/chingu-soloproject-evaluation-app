import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Skeleton} from "@/components/ui/skeleton";

export const ProjectSubmissionListSkeleton = () => {
    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="border-b-2">Discord name</TableHead>
                <TableHead className="border-b-2">Role</TableHead>
                <TableHead className="border-b-2">Role Type</TableHead>
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

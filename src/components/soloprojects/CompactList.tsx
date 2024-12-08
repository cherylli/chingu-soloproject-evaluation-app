import {Submission} from "@/types/SoloProjectTypes";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import Link from "next/link";

const CompactList = ({records}: { records: Submission[] }) => {
    return (
        <Table className="w-[90%] mx-auto border-2 border-amber-950">
            <TableBody>
                {records.map(record => (
                    <TableRow key={record.id}>
                        <TableCell>
                            <Link href={`/solo-project/${record.id}`}
                                  target="_blank"
                                  rel="noopener noreferrer">{record.fields.Timestamp?.toString()}
                            </Link>
                        </TableCell>
                        <TableCell>{record.fields["Evaluation Status"]}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default CompactList

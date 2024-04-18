import {FilteredFields} from "@/types/SoloProjectTypes";
import questions from "@/data/quizAnswers.json";
import {Answer} from "@/types/Answer";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import QuizAnswerItem from "@/components/soloprojects/QuizAnswerItem";
import Link from "next/link";

const ProductOwnerDetails = ({fields}: { fields: FilteredFields }) => {
    const poQuestions = questions.PO as Answer[]

    return <>
        <table>
            <tr>
                <td>PO Product Backlog URL:</td>
            </tr>
            <tr>
                <td className="px-4 text-blue-500 hover:underline">
                    <Link
                        href={fields["PO Product Backlog URL"]}
                        target="_blank"
                        rel="noopener noreferrer"
                    >{fields["PO Product Backlog URL"]}</Link>
                </td>
            </tr>
        </table>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>Certification</TableCell>
                    <TableCell>{fields["PO: Certification"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Highest Certification</TableCell>
                    <TableCell>{fields["PO: Highest Certification"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Participated in Projects as PO: </TableCell>
                    <TableCell>{fields["PO: Participated in Project as PO"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Project Details: </TableCell>
                    <TableCell>{fields["PO: Project Details"]}</TableCell>
                </TableRow>
                {poQuestions.map(q =>
                    <QuizAnswerItem key={q.questionNumber} question={q}
                                    userAnswer={fields[q.questionNumber as keyof FilteredFields]}/>
                )}
                <TableRow>
                    <TableCell>PO19: Name the Scrum event that is most important to the continuous improvement of
                        the Scrum team and why.</TableCell>
                    <TableCell>{fields["PO19"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>PO20: Who plans the work to be accomplished during a sprint?</TableCell>
                    <TableCell>{fields["PO20"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>PO21: Describe the role of the Product Owner and why it’s important.</TableCell>
                    <TableCell>{fields["PO21"]}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </>
}

export default ProductOwnerDetails
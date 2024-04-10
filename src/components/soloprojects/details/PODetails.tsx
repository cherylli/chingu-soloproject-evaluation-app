import {FilteredFields} from "@/types/SoloProjectTypes";
import questions from "@/data/quizAnswers.json";
import {Answer} from "@/types/Answer";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import QuizAnswerItem from "@/components/soloprojects/QuizAnswerItem";

const ProductOwnerDetails = ({fields}: {fields: FilteredFields}) => {
    const poQuestions = questions.PO as Answer[]

    return(
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
                {poQuestions.map(q=>
                    <QuizAnswerItem key={q.questionNumber} question={q} userAnswer={fields[q.questionNumber]} />
                )}
                <TableRow>
                    <TableCell>PO19: Name the Scrum event that is most important to the continuous improvement of the Scrum team and why.</TableCell>
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
    )
}

export default ProductOwnerDetails
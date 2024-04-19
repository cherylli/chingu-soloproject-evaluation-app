import {FilteredFields} from "@/types/SoloProjectTypes";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import QuizAnswerItem from "@/components/soloprojects/QuizAnswerItem";
import questions from '@/data/quizAnswers.json'
import {Answer} from "@/types/Answer";
import {mappedQuestions} from "@/lib/quizHelper";

const ScrumMasterDetails = ({fields}: {fields: FilteredFields}) => {
    const smQuestions = mappedQuestions(fields, questions.SM as Answer[]);

    return(
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>Certification</TableCell>
                    <TableCell>{fields["SM: Certification"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Highest Certification</TableCell>
                    <TableCell>{fields["SM: Highest Certification"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Participated in Projects as SM: </TableCell>
                    <TableCell>{fields["SM: Participated in Project as SM"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Project Details: </TableCell>
                    <TableCell>{fields["SM: Project Details"]}</TableCell>
                </TableRow>
                {smQuestions.map(q=>
                    <QuizAnswerItem key={q.questionNumber} question={q} userAnswer={fields[q.questionNumber as keyof FilteredFields]} />
                )}
                <TableRow>
                    <TableCell>SM20: Describe the roles and responsibilities of the Scrum Master, the Product Owner, and the Development Team in a Scrum project.</TableCell>
                    <TableCell>{fields["SM20"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>SM21: Explain the concept of “user stories” and how they are used in Scrum. Provide an example of a user story.</TableCell>
                    <TableCell>{fields["SM21"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>SM22: Discuss the importance of the Sprint Retrospective and how it contributes to continuous improvement in a Scrum team.</TableCell>
                    <TableCell>{fields["SM22"]}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
 }
 
 export default ScrumMasterDetails
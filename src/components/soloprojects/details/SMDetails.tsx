import {FilteredFields} from "@/types/SoloProjectTypes";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import QuizAnswerItem from "@/components/soloprojects/QuizAnswerItem";
import questions from '@/data/quizAnswers.json'
import {Answer} from "@/types/Answer";
import {mappedQuestions} from "@/lib/quizHelper";
import Score from "@/components/soloprojects/Score";

const ScrumMasterDetails = ({fields}: { fields: FilteredFields }) => {
    const smQuestions = mappedQuestions(fields, questions.SM as Answer[]);

    return <>
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
            </TableBody>
        </Table>
        <Table>
            <TableBody>
                {smQuestions.map(q =>
                    <QuizAnswerItem key={q.questionNumber} question={q}/>
                )}
            </TableBody>
        </Table>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>SM20: Describe the roles and responsibilities of the Scrum Master, the Product Owner, and
                        the Development Team in a Scrum project.
                        <span
                            className="text-slate-500 text-xs whitespace-pre-wrap">{`\n\nThe Scrum Master is responsible for ensuring the team follows Scrum practices and principles, and helps remove any obstacles the team might face. \n\nThe Product Owner is responsible for maximizing the value of the product and managing the Product Backlog. \n\nThe Development Team is responsible for delivering potentially releasable increments of “Done” product at the end of each Sprint.`}
                        </span>
                    </TableCell>
                    <TableCell>{fields["SM20"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>SM21: Explain the concept of “user stories” and how they are used in Scrum. Provide an
                        example of a user story.
                        <span className="text-slate-500 text-xs whitespace-pre-wrap">{`\n\nUser stories are a simple way of capturing product functionality from the perspective of the user. They typically follow the format: “As a [type of user], I want [an action] so that [a benefit/a value]”. For example, “As a user, I want to be able to reset my password so that I can regain access to my account if I forget it.”`}</span>
                    </TableCell>
                    <TableCell>{fields["SM21"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>SM22: Discuss the importance of the Sprint Retrospective and how it contributes to
                        continuous improvement in a Scrum team.
                        <span className="text-slate-500 text-xs whitespace-pre-wrap">{`\n\nThe Sprint Retrospective is an opportunity for the Scrum Team to inspect itself and create a plan for improvements to be enacted during the next Sprint. It’s a key mechanism`}</span>
                    </TableCell>
                    <TableCell>{fields["SM22"]}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <Score questions={smQuestions}/>
    </>
}

export default ScrumMasterDetails
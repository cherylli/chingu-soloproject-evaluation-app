import {FilteredFields} from "@/types/SoloProjectTypes";
import questions from "@/data/quizAnswers.json";
import {Answer} from "@/types/Answer";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import QuizAnswerItem from "@/components/soloprojects/QuizAnswerItem";
import Link from "next/link";
import {mappedQuestions} from "@/lib/quizHelper";
import Score from "@/components/soloprojects/Score";


const ProductOwnerDetails = ({fields}: { fields: FilteredFields }) => {
    const poQuestions = mappedQuestions(fields, questions.PO as Answer[]);

    return <>
        <table>
            <tbody>
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
            </tbody>
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
            </TableBody>
        </Table>
        <Table>
            <TableBody>
                {poQuestions.map(q =>
                    <QuizAnswerItem key={q.questionNumber} question={q}/>
                )}
            </TableBody>
        </Table>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>PO19: Name the Scrum event that is most important to the continuous improvement of
                        the Scrum team and why.
                        <span
                            className="text-slate-500 text-xs whitespace-pre-wrap">{`\n\nThe Sprint Retrospective. Per the Scrum Guide: ‘The purpose of the Sprint Retrospective is to plan ways to increase quality and effectiveness.\n\nThe Scrum Team inspects how the last Sprint went with regards to individuals, interactions, processes, tools, and their Definition of Done. Inspected elements often vary with the domain of work. Assumptions that led them astray are identified and their origins explored. The Scrum Team discusses what went well during the Sprint, what problems it encountered, and how those problems were (or were not) solved.\n\nThe Scrum Team identifies the most helpful changes to improve its effectiveness. The most impactful improvements are addressed as soon as possible. They may even be added to the Sprint Backlog for the next Sprint.’`}
                        </span>
                    </TableCell>
                    <TableCell>{fields["PO19"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>PO20: Who plans the work to be accomplished during a sprint?
                        <span
                            className="text-slate-500 text-xs whitespace-pre-wrap">{`\n\nPer the Scrum Guide: 'The Developers select items from the Product Backlog to include in the current Sprint. ... The Developers plan the work necessary to create an Increment that meets the Definition of Done.’ Yet it is the Product Owner who should initially propose what the Sprint Goal will be, and then the team collaboratively defines a Sprint Goal.’`}
                        </span>
                    </TableCell>
                    <TableCell>{fields["PO20"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>PO21: Describe the role of the Product Owner and why it’s important.
                        <span
                            className="text-slate-500 text-xs whitespace-pre-wrap">{`\n\nPer the Scrum Guide: ‘The Product Owner is accountable for maximizing the value of the product resulting from the work of the Scrum Team. How this is done may vary widely across organizations, Scrum Teams, and individuals.\``}
                        </span>
                    </TableCell>
                    <TableCell>{fields["PO21"]}</TableCell>
                </TableRow>
            </TableBody>
        </Table>


        <Score questions={poQuestions}/>
    </>
}

export default ProductOwnerDetails
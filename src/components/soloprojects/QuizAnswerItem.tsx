import {TableCell, TableRow} from "@/components/ui/table";
import {Answer, MappedQuestionAndAnswer} from "@/types/Answer";
import {Button} from "@/components/ui/button";
import {toast} from "react-hot-toast";
import {Copy} from "lucide-react";
import {CopyToClipboard} from "react-copy-to-clipboard";

const QuizAnswerItem = ({question}: { question: MappedQuestionAndAnswer }) => {

    return (
        <TableRow key={question.questionNumber}>
            <TableCell>{question.question}</TableCell>
            <TableCell>{question.userAnswer}</TableCell>
            <TableCell className={question.isAnswerCorrect ? `bg-emerald-900` : `bg-red-950`}>
                {question.answer.join(", ")}
            </TableCell>
            <TableCell className="whitespace-pre-wrap">{question.answerOptions}</TableCell>
            <TableCell>
                <CopyToClipboard text={`${question.question}\n\n${question.answerOptions}`}>
                    <Button
                        variant="outline"
                        size="icon"
                        className="ml-2 h-8 w-8"
                        onClick={() => toast('Copied!')}
                    >
                        <Copy className="h-4 w-4"/>
                    </Button>
                </CopyToClipboard>
            </TableCell>
        </TableRow>
    )
}

export default QuizAnswerItem
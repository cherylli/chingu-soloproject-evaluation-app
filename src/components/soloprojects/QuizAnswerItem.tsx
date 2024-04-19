import {TableCell, TableRow} from "@/components/ui/table";
import {MappedQuestionAndAnswer} from "@/types/Answer";
import {Button} from "@/components/ui/button";
import {toast} from "react-hot-toast";
import {Copy} from "lucide-react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {trimUserAnswer} from "@/lib/quizHelper";

const QuizAnswerItem = ({question}: { question: MappedQuestionAndAnswer }) => {
    return (
        <TableRow key={question.questionNumber}>
            <TableCell>
                <div>{question.question}</div>
                <div className="text-slate-500 text-xs whitespace-pre-wrap">{question.options}</div>
            </TableCell>
            <TableCell className={question.isAnswerCorrect ? `bg-emerald-900` : `bg-red-950`}>
                {trimUserAnswer(question.userAnswer)}
                {!question.isAnswerCorrect?` (${question.answer.join(", ")})`:""}
            </TableCell>
            <TableCell>
                <CopyToClipboard text={`${question.question}\n\n${question.options}`}>
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
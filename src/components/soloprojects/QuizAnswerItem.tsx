import {TableCell, TableRow} from "@/components/ui/table";
import {Answer} from "@/types/Answer";

const QuizAnswerItem = ({question, userAnswer}: { question: Answer, userAnswer: string }) => {

    const isAnswerCorrect = () => {
        return question.answer.includes(userAnswer?.substring(0, 1))
    }

    return (
        <TableRow>
            <TableCell>{question.question}</TableCell>
            <TableCell>{userAnswer}</TableCell>
            <TableCell className={isAnswerCorrect() ? `bg-emerald-900` : `bg-red-950`}>
                {question.answer}
            </TableCell>
        </TableRow>
    )
}

export default QuizAnswerItem
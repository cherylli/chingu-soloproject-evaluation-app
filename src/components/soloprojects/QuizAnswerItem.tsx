import {TableCell, TableRow} from "@/components/ui/table";
import {Answer} from "@/types/Answer";

const QuizAnswerItem = ({question, userAnswer}: { question: Answer, userAnswer: string }) => {

    const isAnswerCorrect = () => {
        if(userAnswer){
            if (question.answer.length===1) {
                return question.answer.includes(userAnswer.substring(0,1))
            } else {
                const userAnswerMap = userAnswer.map(u=> u.substring(0,1))
                return question.answer.sort().toString() === userAnswerMap.sort().toString()
            }
        }else {
            return null
        }

    }

    return (
        <TableRow>
            <TableCell>{question.question}</TableCell>
            <TableCell>{userAnswer}</TableCell>
            <TableCell className={isAnswerCorrect() ? `bg-emerald-900` : `bg-red-950`}>
                {question.answer.join(", ")}
            </TableCell>
        </TableRow>
    )
}

export default QuizAnswerItem
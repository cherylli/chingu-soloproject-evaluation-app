import {TableCell, TableRow} from "@/components/ui/table";
import {Answer} from "@/types/Answer";
import {Button} from "@/components/ui/button";
import {toast} from "react-hot-toast";
import {Copy} from "lucide-react";
import {CopyToClipboard} from "react-copy-to-clipboard";

const QuizAnswerItem = ({question, userAnswer}: { question: Answer, userAnswer: any }) => {

    const isAnswerCorrect = () => {
        console.log(userAnswer);
        if(userAnswer){
            if (question.answer.length===1) {
                return question.answer.includes((userAnswer as string).substring(0,1))
            } else {
                const userAnswerMap = (userAnswer as string[]).map(u=> u.substring(0,1))
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
            <TableCell className="whitespace-pre-wrap">{question.answerOptions}</TableCell>
            <TableCell>
                <CopyToClipboard text="test">
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
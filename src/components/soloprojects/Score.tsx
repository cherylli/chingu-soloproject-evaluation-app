import {calculateScore, generateTextForWrongAnswers} from "@/lib/quizHelper";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Button} from "@/components/ui/button";
import {toast} from "react-hot-toast";
import {Copy} from "lucide-react";
import {MappedQuestionAndAnswer} from "@/types/Answer";

const Score = ({questions}: {questions:MappedQuestionAndAnswer[]}) => {
    return <>
        <div>Score: {calculateScore(questions).string}</div>
        <div className="flex items-center">
            <div>Copy wrong questions and options:</div>
            <CopyToClipboard text={generateTextForWrongAnswers(questions)}>
                <Button
                    variant="outline"
                    size="icon"
                    className="ml-2 h-8 w-8"
                    onClick={() => toast('Copied!')}
                >
                    <Copy className="h-4 w-4"/>
                </Button>
            </CopyToClipboard>
        </div>
    </>
}

export default Score
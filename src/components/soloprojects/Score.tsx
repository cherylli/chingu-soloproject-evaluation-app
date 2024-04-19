import {calculateScore, generateTextForWrongAnswers} from "@/lib/quizHelper";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Button} from "@/components/ui/button";
import {toast} from "react-hot-toast";
import {Copy} from "lucide-react";
import {MappedQuestionAndAnswer} from "@/types/Answer";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const Score = ({questions}: {questions:MappedQuestionAndAnswer[]}) => {
    return <Card>
        <CardHeader>
            <CardTitle>Score</CardTitle>
        </CardHeader>
        <CardContent>
            <div>{calculateScore(questions).string}</div>
            <div className="flex items-center">
                <div className="text-slate-500">Copy wrong questions and options:</div>
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
        </CardContent>
    </Card>
}

export default Score
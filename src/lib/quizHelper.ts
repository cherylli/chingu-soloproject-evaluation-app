import {FilteredFields} from "@/types/SoloProjectTypes";
import {Answer} from "@/types/Answer";

const isAnswerCorrect = (userAnswer: any, answer: any) => {
    if(userAnswer){
        if (answer.length===1) {
            return answer.includes((userAnswer as string).substring(0,1))
        } else {
            const userAnswerMap = (userAnswer as string[]).map(u=> u.substring(0,1))
            return answer.sort().toString() === userAnswerMap.sort().toString()
        }
    }else {
        return null
    }

}

export const mappedQuestions = (fields: FilteredFields, questions: Answer[]) => {
    return questions.map(q=>{
        return {
            question: q.question,
            answer: q.answer,
            options: q.answerOptions,
            userAnswer: fields[q.questionNumber],
            isAnswerCorrect: isAnswerCorrect(fields[q.questionNumber], q.answer)
        }
    })

}
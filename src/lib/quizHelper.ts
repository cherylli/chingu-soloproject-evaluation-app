/***
 Helper functions for quizzes (SM and PO)
 ***/

import {FilteredFields} from "@/types/SoloProjectTypes";
import {Answer, MappedQuestionAndAnswer} from "@/types/Answer";

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
            questionNumber: q.questionNumber,
            question: q.question,
            answer: q.answer,
            options: q.answerOptions,
            userAnswer: fields[q.questionNumber as keyof FilteredFields],
            isAnswerCorrect: isAnswerCorrect(fields[q.questionNumber as keyof FilteredFields], q.answer)
        }
    })
}

export const calculateScore = (questions:MappedQuestionAndAnswer[]) =>{
    const correct = questions.filter(q=>q.isAnswerCorrect === true).length
    const total = questions.length
    const percentage = correct/total * 100
    return {
        correct,
        total,
        percentage,
        string: `${correct}/${total}: (${percentage}%)`
    }
}

export const generateTextForWrongAnswers =(questions:MappedQuestionAndAnswer[]) =>{
    return questions.filter(q=>q.isAnswerCorrect !== true).map(q=>{
        return `${q.question}\n\n${q.options}`
    }).join("\n\n---\n\n")
}

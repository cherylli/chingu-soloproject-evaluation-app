export type Answer = {
    "questionNumber": string,
    "question": string,
    "answer": string[],
    "answerText"?: string,
    "answerOptions": string,
}

export type MappedQuestionAndAnswer = {
    question: Answer[],
    answer: string[],
    options: string,
    userAnswer: any,
    isAnswerCorrect: boolean
}
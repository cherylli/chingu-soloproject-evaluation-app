export type Answer = {
    "questionNumber": string,
    "question": string,
    "answer": string[],
    "answerText"?: string,
    "answerOptions": string,
}

// mapped questions combines userAnswers + original questions information from the JSON file
// we use this in PO and SM detail pages to map through all the questions
export type MappedQuestionAndAnswer = {
    question: Answer[],
    answer: string[],
    options: string,
    userAnswer: any,
    isAnswerCorrect: boolean
}
export type FeedbackContent = {
    condition: string
    importance?: string
    feedback: string
}

export type FeedbackCategory = {
    name: string
    content: FeedbackContent[]
}
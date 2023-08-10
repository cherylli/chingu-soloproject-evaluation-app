type Author = {
    id: string,
    email: string,
    name: string,
}

export type Comment = {
    id: string,
    author: Author,
    text: string,
    createdTime: Date,
    mentioned?: Object,
    lastUpdatedTime: Date | null,
}

export type CommentsAPIResponse = {
    comments: Comment[]
    offset: string | null
}
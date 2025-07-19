type ActionSuccess<T> = {
    success: true
    message: string
    data: T
}

type ActionFailure = {
    success: false
    message: string
}

export type ActionResponse<T> = ActionSuccess<T> | ActionFailure;

// TODO: update all services to use ActionResponse
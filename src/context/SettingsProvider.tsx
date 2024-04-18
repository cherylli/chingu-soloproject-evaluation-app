// this is not working

/*
'use client'
import {createContext, useContext, useReducer} from "react";

interface IFeedback {
    showFeedback: boolean;
}
type SettingsContextType = {
    showFeedback: IFeedback
}

type FeedbackAction =
    | { type: 'SHOW'; payload: null}
    | { type: 'HIDE'; payload: null}

const initialValues: SettingsContextType = {
    showFeedback: true
}

export const SettingsContext = createContext<SettingsContextType| null>(initialValues)

function feedbackReducer(state: IFeedback, action: FeedbackAction): IFeedback {
    switch (action.type) {
        case 'SHOW': {
            return {...state, showFeedback: true}
        }
        case 'HIDE': {
            return {...state, showFeedback: false}
        }
        default: {
            throw new Error(`Unhandled action type ${action.type}`)
        }
    }
}



export function SettingsProvider ({children}) {
    const [state, dispatch] = useReducer(feedbackReducer, initialValues)

    return <SettingsContext.Provider value={[state, dispatch]}>
        {children}
    </SettingsContext.Provider>
}

export function useSettings () {
    const context = useContext(SettingsContext)
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider')
    }
    return context
}


*/

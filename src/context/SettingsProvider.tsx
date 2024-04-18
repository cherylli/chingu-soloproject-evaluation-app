'use client'
import {createContext, useContext, useReducer} from "react";

const initialValues = {
    showFeedback: true
}

export const SettingsContext = createContext(initialValues)

function feedbackReducer(state, action) {
    switch (action.type) {
        case 'show': {
            return {showFeedback: true}
        }
        case 'hide': {
            return {showFeedback: false}
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




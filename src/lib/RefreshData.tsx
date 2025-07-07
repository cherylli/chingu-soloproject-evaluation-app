'use client'

import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";

export function RefreshData({ms = 60000, refreshAction}: {
    ms: number,
    refreshAction: () => Promise<void>
}) {
    const [shouldRun, setShouldRun] = useState(false)
    const [lastCheck, setLastCheck] = useState(Date.now())

    const runRefreshAction = async () => {
        if(Date.now() - lastCheck < ms) return
        console.log("actually refreshing...")
        toast.promise(refreshAction(), {
            loading: "Refreshing...",
            success: "Refreshed!",
            error: "Failed to refresh!"
        })
        setLastCheck(Date.now())
    }

    useEffect(() => {
        const onFocus = () => {
            console.log("focus")
            runRefreshAction()
            setShouldRun(true)
        }
        const onBlur = () => setShouldRun(false)

        window.addEventListener('focus', onFocus)
        window.addEventListener('blur', onBlur)

        const interval = setInterval(() => {
            if(shouldRun) {
                runRefreshAction()
            }
        }, ms)
        return () => {
            window.removeEventListener('focus', onFocus)
            window.removeEventListener('blur', onBlur)
            clearInterval(interval)
        }
    }, [ms, lastCheck, refreshAction]) // eslint-disable-line react-hooks/exhaustive-deps

    return null
}
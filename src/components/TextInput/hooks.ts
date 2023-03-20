import { useState } from "react"

export const useTriggerSubmitAfterDelay = (submit: () => void) => {
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>()

    return () => {
        clearTimeout(timer)

        const newTimer = setTimeout(submit, 300);

        setTimer(newTimer)
    }

}
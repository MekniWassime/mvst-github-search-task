import { useState } from "react"
/**
 * A custom hook that allows us to automatically detect if the user has stopped typing for a specific delay (300ms)
 * 
 * This hook can be used for any event that happens in bursts and we want to check if there has been enough delay between now and the last time the event triggered
 * @param submit a callback function called when the user stops typing
 * @returns a function that should be called every time the event happens (eg the user is typing and the input has changed)
 */
export const useTriggerSubmitAfterDelay = (submit: () => void) => {
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>()

    return () => {
        clearTimeout(timer)

        const newTimer = setTimeout(submit, 300);

        setTimer(newTimer)
    }

}
import React from 'react'
import { useController } from 'react-hook-form'
import { useTriggerSubmitAfterDelay } from './hooks'

interface TextInputProps {
    name: string,
    submit: () => void
}

function TextInput({ name, submit }: TextInputProps) {
    const { field } = useController({ name: name, defaultValue: "" })
    const triggerSubmit = useTriggerSubmitAfterDelay(submit)

    return (
        <input type="text" {...field} onChange={(e) => { field.onChange(e); triggerSubmit() }} />
    )
}

export default TextInput
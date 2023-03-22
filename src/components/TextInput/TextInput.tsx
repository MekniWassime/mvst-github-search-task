import React from 'react'
import { useController } from 'react-hook-form'
import { useTriggerSubmitAfterDelay } from './hooks'

interface TextInputProps {
    name: string,
    submit: () => void,
    label?: string
}
/**
 * A text input that automatically submits once the user stops typing
 * 
 * This field is controlled by React hook form and should be placed inside a `FormProvider` to work
 * @param name name of the input also used by react hook form as the name of the value this input holds
 * @param label the label or placeholder text displayed inside the input
 * @param submit the function that the input needs to call to trigger a submit
 */
function TextInput({ name, submit, label }: TextInputProps) {
    const { field } = useController({ name: name, defaultValue: "" })
    const triggerSubmit = useTriggerSubmitAfterDelay(submit)

    return (
        <>
            <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type={name} id={name} {...field} onChange={(e) => { field.onChange(e); triggerSubmit() }} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={label} required />
            </div>
        </>
    )
}

export default TextInput
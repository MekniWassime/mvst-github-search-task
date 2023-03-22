import React, { ChangeEvent, useRef, useState } from "react";
import { useController } from "react-hook-form";
import { useTriggerSubmitAfterDelay } from "../TextInput/hooks";
import { useClickedOutside } from "./hooks";
import SuggestionItem from "./SuggestionItem";

interface AutoCompleteInputProps {
    name: string,
    label: string,
    getSuggestions: (value: string) => string[] | Promise<string[]>,
    delay?: number
    submit: (value: string) => void
}

export default function AutoCompleteInput({ label, name, delay = 0, getSuggestions, submit }: AutoCompleteInputProps) {
    const { field } = useController({ name: name, defaultValue: "" })
    const [suggestions, setSugesstions] = useState<string[]>([]);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [value, setValue] = useState("");
    const ref = useRef(null)
    useClickedOutside(ref, () => {
        setShowSuggestion(false);
    })
    const handleSubmit = async (query?: string) => {
        query = query || ''
        const newSuggestions = await getSuggestions(query)
        setSugesstions(newSuggestions);
    };
    const triggerSubmit = useTriggerSubmitAfterDelay({ submit: handleSubmit, delay: delay })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setShowSuggestion(true);
        setValue(input);
    };

    const handleSelect = (value: string) => {
        field.onChange(value);
        setValue(value);
        setShowSuggestion(false);
        submit(value)
    };

    return (
        <div ref={ref}>
            <div>
                <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">{label}</label>
                <input
                    className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name={name}
                    id={name}
                    ref={field.ref}
                    placeholder={label}
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onKeyUp={(e) => triggerSubmit(value)}
                    autoComplete='off'
                />
            </div>

            <div
                hidden={!showSuggestion}
            >
                {suggestions.map((item) => (<SuggestionItem key={item} value={item} onClick={handleSelect} />))}
            </div>
        </div>
    );
}

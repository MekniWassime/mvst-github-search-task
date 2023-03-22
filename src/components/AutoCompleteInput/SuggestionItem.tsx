import React from 'react'

interface SuggestionItemProps {
    value: string,
    onClick: (value: string) => void
}
/**
 * show suggestions for a dropdown
 * @param value the suggestion value that should be shown 
 * @param onClick this function is called when the component is clicked, the item's value is passed as a parameter
 */
function SuggestionItem({ value, onClick }: SuggestionItemProps) {
    return (
        <div className='w-56 p-3 text-gray-900 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 hover:dark:bg-gray-600' onClick={() => { onClick(value) }}>{value}</div>
    )
}

export default SuggestionItem
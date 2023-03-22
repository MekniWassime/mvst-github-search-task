import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface DarkModeWrapperProps {
    children: JSX.Element[];
}
/**
 * A utility component that reads the dark theme setting from the redux app settings store and
 * adds or removes the tailwind "dark" class name depending on the setting 
 */
function DarkModeWrapper({ children }: DarkModeWrapperProps) {
    const isDarkModeEnabled = useSelector((state: RootState) => state.appSettings.darkMode);
    return (
        <div className={isDarkModeEnabled ? "dark" : ""}>
            <div className='dark:bg-gray-900 min-h-screen'>
                {children}
            </div>
        </div>
    )
}

export default DarkModeWrapper
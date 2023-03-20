import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface DarkModeWrapperProps {
    children: JSX.Element;
}

function DarkModeWrapper({ children }: DarkModeWrapperProps) {
    const isDarkModeEnabled = useSelector((state: RootState) => state.appSettings.darkMode);
    return (
        <div className={isDarkModeEnabled ? "dark" : ""}>
            <div className='dark:bg-gray-900'>
                {children}
            </div>
        </div>
    )
}

export default DarkModeWrapper
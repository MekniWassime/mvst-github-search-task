import React from 'react'
import { UserInfo } from '../../services/UserService'

interface UserInfoItemProps {
    user: UserInfo | null,
}
/**
 * Shows profile information regarding the currently selected user
 * 
 * This component changes it's layout based on screen size
 * @param user user information, if null the component will render a loading animation
 */
function UserInfoItem({ user }: UserInfoItemProps) {
    const isLoading = user === null;
    /**
     * Renders the Avatar of the user
     * Shows loading effect if information is still unavailable
     */
    const renderAvatar = () => {
        if (isLoading)
            return <div className='duration-1000 animate-pulse w-32 h-32 md:w-56 md:h-56 rounded-full bg-gray-200 dark:bg-gray-700' />
        else
            return <img src={user.avatarUrl} alt="user avatar" className='w-32 h-32 md:w-56 md:h-56 rounded-full bg-gray-200 dark:bg-gray-700' />
    }
    /** 
     * Render placeholder lines if component is loading
     * The component renders the login only if name is null
     * Otherwise it will show both the login and name
    */
    const renderNameAndLogin = () => {
        if (isLoading)
            return [
                <div className='duration-1000 animate-pulse w-52 h-8 mb-2 rounded bg-gray-200 dark:bg-gray-700' />,
                <div className='duration-1000 animate-pulse w-40 h-3 rounded bg-gray-200 dark:bg-gray-700' />
            ]
        else if (user.name)
            return [
                <div className='text-3xl text-gray-800 dark:text-gray-400 font-semibold font-mono'>{user.name}</div>,
                <div className='text-gray-500 dark:text-gray-600 font-semibold font-mono'>{user.login}</div>
            ]
        else return <div className='text-3xl text-gray-800 dark:text-gray-400 font-semibold font-mono'>{user.login}</div>
    }

    return (
        <div className='flex gap-4 flex-row justify-center md:flex-col p-4'>
            {renderAvatar()}
            <div className='flex flex-col justify-center md:justify-start'>
                {renderNameAndLogin()}
            </div>
        </div>
    )
}

export default UserInfoItem
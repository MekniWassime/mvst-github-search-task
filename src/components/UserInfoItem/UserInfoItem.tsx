import React from 'react'
import { UserInfo } from '../../services/UserService'

interface UserInfoItemProps {
    user: UserInfo,
}

function UserInfoItem({ user: { name, login, avatarUrl } }: UserInfoItemProps) {
    return (
        <div className='flex gap-4 flex-row justify-center md:flex-col p-4'>
            <img src={avatarUrl} alt="user avatar" className='w-32 h-32 md:w-56 md:h-56 rounded-full' />
            <div className='flex flex-col justify-center md:justify-start'>
                <div className='text-3xl text-gray-800 font-semibold font-mono'>{name ? name : login}</div>
                {name && <div className='text-gray-500 font-semibold font-mono'>{login}</div>}
            </div>
        </div>
    )
}

export default UserInfoItem
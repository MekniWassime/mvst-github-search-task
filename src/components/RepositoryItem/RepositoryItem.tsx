import React from 'react'
import { RepositoryInfo } from '../../services/RepositoryService'
import StarIcon from './StarIcon'
import { humanReadableDuration } from './utility'

interface RepositoryItemProps {
    repository: RepositoryInfo,
}

function RepositoryItem({ repository: { name, pushedAt, primaryLanguage, isStarred, stars, url } }: RepositoryItemProps) {

    const renderPrimaryLanguage = () => {
        if (primaryLanguage)
            return (<span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                <span className="w-2 h-2 mr-1 bg-blue-500 rounded-full"></span>
                {primaryLanguage}
            </span>);
        else return <div></div>
    }

    return (
        <div className="block mb-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className='flex flex-row justify-between'>
                <a href={url} target="_blank" className="font-mono mb-2 text-2xl font-medium tracking-tight text-gray-900 dark:text-white hover:underline cursor-pointer" rel="noreferrer" >{name}</a>
                <div className='flex flex-row items-center flex-shrink-0'>
                    <StarIcon isStarred={isStarred} /><div className='ml-1 text-gray-900 dark:text-gray-400 pb-0.5 text-2xl'>{stars}</div>
                </div>
            </div>
            <div className='flex flex-row justify-between pt-4'>
                {renderPrimaryLanguage()}
                <div className="font-normal text-gray-700 dark:text-gray-400">{pushedAt ? `updated ${humanReadableDuration(pushedAt)}` : ""}</div>
            </div>
        </div>
    )
}

export default RepositoryItem
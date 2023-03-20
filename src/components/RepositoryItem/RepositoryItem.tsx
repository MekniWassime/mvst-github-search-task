import React from 'react'
import { RepositoryInfo } from '../../querries/RepoQuerries'

interface RepositoryItemProps {
    repository: RepositoryInfo,
}

function RepositoryItem({ repository }: RepositoryItemProps) {
    return (
        <div>
            <div>{repository.name}</div>
            {repository.pushedAt && <div>{repository.pushedAt.toISOString()}</div>}
            {repository.primaryLanguage && <div>{repository.primaryLanguage}</div>}
        </div>
    )
}

export default RepositoryItem
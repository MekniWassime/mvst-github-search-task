import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useEnforceUrlParams } from './hooks';
import TextInput from '../../components/TextInput';
import { buildQueryString } from './utility';
import RepositoryItem from '../../components/RepositoryItem';
import UserInfoItem from '../../components/UserInfoItem';
import { searchForUser, useUserInfo } from '../../services/UserService';
import { useSearchRepoByUser } from '../../services/RepositoryService';
import RepositoryLoadingPlaceholder from '../../components/RepositoryLoadingPlaceholder';
import AutoCompleteInput from '../../components/AutoCompleteInput/AutoCompleteInput';
import { useNavigate } from 'react-router-dom';
/**
 * This page allows the user to query their or other user's github repositories
 * 
 * you can also copy the url link containing your user name and share it with others
 */
function Repositories() {
    //react hook form hooks
    const methods = useForm();
    const { watch } = methods;
    const userSearchMethods = useForm();
    //reads the user name from the url path and adds it if it's not there
    const user = useEnforceUrlParams()
    //asyncronously fetches user profile info to display alongside their repositories
    const userInfo = useUserInfo(user);
    //The query that is sent to the graphql api, it contains the search term, user and many other filters
    const [query, setQuery] = useState(`user:${user}`);
    /** when called it builds the query string and updates its state*/
    const submit = () => {
        const newQuery = buildQueryString(
            watch('searchString'), user, undefined, undefined);
        setQuery(newQuery);
    }
    //this hook is triggered when the query is changed (aka submit is called)
    const { data, loading } = useSearchRepoByUser(query);
    /**repository list possible states are loading, noData and hasData */
    const renderRepositoryList = () => {
        if (loading)
            return RepositoryLoadingPlaceholder({ itemCount: 7 });
        else if (data.length === 0)
            return <p className="mt-10 text-center text-3xl text-gray-900 dark:text-white" data-testid="noRepositoriesFound">No Repositories found that match your search</p>
        else
            return data.map((repository) => (<RepositoryItem key={repository.id} repository={repository} />))
    }

    const handleUserSearch = (username: string) => {
        if (username !== undefined && username !== user) {
            window.location.pathname = `/repos/${username}`
        }
    }


    return (
        <div className='flex flex-col md:flex-row'>
            <div className='px-6 py-3 md:pt-10 flex-none shadow-md md:min-h-screen'>
                <UserInfoItem user={userInfo} />
                <FormProvider {...userSearchMethods}>
                    <AutoCompleteInput name='user' label="Search for users" getSuggestions={searchForUser} submit={handleUserSearch} delay={100} />
                </FormProvider>
            </div>
            <div className='flex-grow p-6 md:pl-8 md:pt-7'>
                <FormProvider {...methods}>
                    <TextInput name="searchString" label="Search" submit={submit} />
                </FormProvider>
                <div className='pt-5'>
                    {renderRepositoryList()}
                </div>
            </div>
        </div>
    )
}

export default Repositories
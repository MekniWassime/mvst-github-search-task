import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useEnforceUrlParams } from './hooks';
import TextInput from '../../components/TextInput';
import { buildQueryString } from './utility';
import RepositoryItem from '../../components/RepositoryItem';
import UserInfoItem from '../../components/UserInfoItem';
import { useUserInfo } from '../../services/UserService';
import { useSearchRepoByUser } from '../../services/RepositoryService/RepositoryService';
import RepositoryLoadingPlaceholder from '../../components/RepositoryLoadingPlaceholder';

function Repositories() {
    const user = useEnforceUrlParams()
    const userInfo = useUserInfo(user);
    const methods = useForm();
    const { watch } = methods;
    const [query, setQuery] = useState(`user:${user}`);

    const submit = () => {
        const newQuery = buildQueryString(
            watch('searchString'), user, undefined, undefined);
        setQuery(newQuery);
    }

    const { data, loading } = useSearchRepoByUser(query);

    const renderRepositoryList = () => {
        if (loading)
            return RepositoryLoadingPlaceholder({ itemCount: 7 });
        else if (data.length === 0)
            return <p className="mt-10 text-center text-3xl text-gray-900 dark:text-white" data-testid="noRepositoriesFound">No Repositories found that match your search</p>
        else
            return data.map((repository) => (<RepositoryItem key={repository.id} repository={repository} />))
    }

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='px-6 py-3 md:pt-10 flex-none shadow-md md:min-h-screen'>
                <UserInfoItem user={userInfo} />
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
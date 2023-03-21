import React, { useState } from 'react'
import NavBar from '../../layouts/NavBar'
import { FormProvider, useForm } from 'react-hook-form'
import { useEnforceUrlParams } from './hooks';
import TextInput from '../../components/TextInput';
import { buildQueryString } from './utility';
import RepositoryItem from '../../components/RepositoryItem';
import UserInfoItem from '../../components/UserInfoItem';
import { useUserInfo } from '../../services/UserService';
import { useSearchRepoByUser } from '../../services/RepositoryService';

function Repositories() {
    const user = useEnforceUrlParams()
    const userInfo = useUserInfo(user);
    const methods = useForm();
    const { watch } = methods;
    const [query, setQuery] = useState(`user:${user}`);

    const submit = () => {
        const newQuery = buildQueryString(
            watch('searchString'), user, undefined, "<10");
        setQuery(newQuery);
    }

    const { data, loading } = useSearchRepoByUser(query);

    const renderList = () => {
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
                    {loading ? <div>Loading</div> : renderList()}
                </div>
            </div>
        </div>
    )
}

export default Repositories
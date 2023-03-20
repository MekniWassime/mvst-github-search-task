import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSearchRepoByUser, useUserInfo } from '../../querries/RepoQuerries';
import { FormProvider, useForm } from 'react-hook-form'
import { useEnforceUrlParams } from './hooks';
import TextInput from '../../components/TextInput';
import { buildQueryString } from './utility';
import RepositoryItem from '../../components/RepositoryItem';

function Repositories() {
    const navigate = useNavigate();
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
        <>
            <div>{userInfo?.name}</div>
            <div>{userInfo?.login}</div>
            <img src={userInfo?.avatarUrl} alt="user avatar" width={125} />
            <FormProvider {...methods}>
                <TextInput name="searchString" submit={submit} />
            </FormProvider>
            <div key="sfsd">Repositories</div>
            {loading ? <div>Loading</div> : renderList()}
        </>
    )
}

export default Repositories
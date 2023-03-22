import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../store/features/AuthSlice';
import { AppDispatch, RootState } from '../../store';

/**
 * After authorizing the application from github, we are redirected to this /success page.
 * 
 * Github OAuth adds a code query parameter that we can use to get an accessToken which we would then use to query the GraphQL API
 * 
 * We read that code and send it to our proxy server (read proxy server readme file for more information) which sends a request to Github and sends back the response that contains an access token.
 * 
 * After which we could use the access token to query the GraphQL API and we are successfully authenticated
 */

function Success() {
    //we need this to read the code parameter delivered by github redirect to our site
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();
    //we need the auth state to know if a request is already in progress or no
    const authState = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    //onComponentMount
    useEffect(() => {
        const code = searchParams.get("code");
        //if auth state is failed or idle we try to fetch a new accessToken
        if (code && ["failed", "idle"].includes(authState.state)) {
            dispatch(getAccessToken(code));
        }
    }, [])
    //automatically redirect based on the updated authentication state of the user
    useEffect(() => {
        const state = authState.state;
        if (state === "succeeded")
            return navigate(`/repos/${authState.login}`);
        if (state === "failed")
            return navigate("/login");
    }, [authState])

    return (
        <div className='flex justify-center py-40'>
            <div className='max-w-2xl text-center'>
                <p className="text-5xl text-gray-900 dark:text-gray-100">
                    Logging You In Please Wait!</p>
                <p className="mt-6 text-base text-gray-600 dark:text-gray-400">
                    If you are able to read this it means that this is taking too long
                </p>
                <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                    This is because authentication goes through a proxy server deployed for free on render, they stop inactive free servers and start them automatically if a request is made
                </p>
                <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                    Takes about 30 seconds, after that subsequent requests are instantanious since the server is up
                </p>
                <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                    If you want to test normal performance logout and back in after this finishes and it won't take long at all
                </p>
            </div>
        </div>
    )
}

export default Success
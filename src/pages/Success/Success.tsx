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
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();
    const authState = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        const code = searchParams.get("code");
        //if auth state is failed or idle we try to fetch a new accessToken
        if (code && ["failed", "idle"].includes(authState.state)) {
            dispatch(getAccessToken(code));
        }
    }, [])

    useEffect(() => {
        const state = authState.state;
        if (state === "succeeded")
            return navigate("/");
        if (state === "failed")
            return navigate("/login");
    }, [authState])



    return (
        <div>LogIn in progress, Please wait</div>
    )
}

export default Success
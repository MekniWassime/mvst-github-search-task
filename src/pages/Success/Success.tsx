import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';


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
    const PROXY_SERVER_URI = process.env.REACT_APP_PROXY_SERVER_URI;

    /**
     * this function uses 'code' to fetch an access token from github oauth through a proxy server
     * @param code a query param fetched after the github oauth redirect
     */
    const getAccessToken = async (code: String)=>{
        try {
            const response = await fetch(`${PROXY_SERVER_URI}/getAccessToken?code=${code}`)
            const data = await response.json()
            localStorage.setItem("accessToken", data.access_token)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
        //as the page mounts fetch the accessToken if not already saved
        const code = searchParams.get("code");
        if(code && localStorage.getItem("accessToken") === null){
            getAccessToken(code);
        }
    }, [])
    


  return (
    <div>LogIn in progress, Please wait</div>
  )
}

export default Success
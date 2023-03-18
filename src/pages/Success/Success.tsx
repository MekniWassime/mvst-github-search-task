import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';

function Success() {
    const [searchParams] = useSearchParams();

    const getAccessToken = async (code: String)=>{
        try {
            console.log("getting access token from proxy")
            const response = await fetch(`https://mvst-task-proxy-service.onrender.com/getAccessToken?code=${code}`)
            const data = await response.json()
            console.log(data)
            localStorage.setItem("accessToken", data.access_token)
            console.log(localStorage.getItem("accessToken"))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
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
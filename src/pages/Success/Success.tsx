import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';

function Success() {
    const [searchParams] = useSearchParams();

    const getAccessToken = async (code: String)=>{
        const response = await fetch(`https://mvst-task-proxy-service.onrender.com/getAccessToken?code=${code}`)
        const data = await response.json()
        localStorage.setItem("accessToken", data.access_token)
        console.log(localStorage.getItem("accessToken"))
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
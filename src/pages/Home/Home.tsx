import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { RootState } from '../../store';
/**
 * This Component surves only to redirect `/` to `/login` if not logged in
 * And `/` to `/repo` if the user is logged in
 */
function Home() {
    const navigate = useNavigate()
    const authState = useSelector((state: RootState) => state.auth)
    useEffect(() => {
        if (authState.state === "succeeded")
            navigate(`/repos/${authState.login}`)
        else
            navigate("/login")
    }, [])


    return (
        <></>
    )
}

export default Home
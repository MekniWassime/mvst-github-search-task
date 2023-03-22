import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { RootState } from '../store'

interface AuthGuardProps {
    children: JSX.Element,
}
/**
 * An Authentication guard that automatically redirects to the /login page if the user is not authenticated
 * 
 * This component reads the authentication state from the redux store
 */
function AuthGuard({ children }: AuthGuardProps) {
    const isLoggedIn = useSelector((state: RootState) => state.auth.state === "succeeded");
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) navigate("/login")
    }, [isLoggedIn])


    return children
}

export default AuthGuard
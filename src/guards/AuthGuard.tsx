import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { RootState } from '../store'

interface AuthGuardProps {
    children: JSX.Element,
}

function AuthGuard({ children }: AuthGuardProps) {
    const isLoggedIn = useSelector((state: RootState) => state.auth.state === "succeeded");
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) navigate("/login")
    }, [isLoggedIn])


    return children
}

export default AuthGuard
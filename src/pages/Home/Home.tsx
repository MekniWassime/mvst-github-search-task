import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/features/AuthSlice';

function Home() {
    const dispatch = useDispatch();
    return (
        <>
            <div>Home</div>
            <button onClick={() => dispatch(logout())}>logout</button>
        </>
    )
}

export default Home
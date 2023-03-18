import React from 'react'
import { useSearchParams } from 'react-router-dom';

function Success() {
    const [searchParams] = useSearchParams();

    const code = searchParams.get("code");

  return (
    <div>LogIn in progress, Please wait</div>
  )
}

export default Success
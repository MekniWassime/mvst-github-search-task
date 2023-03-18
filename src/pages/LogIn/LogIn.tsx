import React from 'react'
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
function LogIn() {
const handleClick = () => {
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`);
}

  return (
    <>
        <div>Please Authorise this application to use Github by pressing the button below</div>
        <button onClick={handleClick}>Login</button>
    </>
  )
}

export default LogIn
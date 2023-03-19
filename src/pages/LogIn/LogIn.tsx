import React from 'react'
/**
 * LogIn page, redirects to Github's oauth page if user whiches to authenticate
 */
function LogIn() {
    /**
     * used by Github oauth to determine which Github application the user wants to authorize
     * in this case our application
    */
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    /**
     * Take the user to Github's oauth page to authorize our Github Application
     */
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
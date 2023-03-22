import gql from "graphql-tag";
import { apolloClient } from "./Apollo/apolloClient";

const PROXY_SERVER_URI = process.env.REACT_APP_PROXY_SERVER_URI;
/**
 * Fetches the login of the current user
 * 
 * Needs the user to be already authenticated,
 * we need this because authenticating to github gives us only the accessToken and no user info
 * @returns the login of the currently authenticated user
 */
export const fetchCurrentLogin = async () => {
  const result = await apolloClient.query({ query: getCurrentLoginQuery });
  return result.data.viewer.login;
}
/**
 * Uses the code handed to us by the OAuth redirect to authenticate the user
 * 
 * This request goes through a proxy server because a client secret is also needed to get the accessToken
 * and it is a security risk to save that client secret on the front end
 * @param code acquired after the github OAuth redirect
 * @returns an accessToken
 */
export const fetchAccessToken = async (code: string) => {
  const response = await fetch(`${PROXY_SERVER_URI}/getAccessToken?code=${code}`)
  const data = await response.json()
  //github oauth error format, error key contains error message
  if ('error' in data) throw new Error(data.error);
  return data.access_token
}
/** query to fetch the current authenticated user login form the graphql api */
const getCurrentLoginQuery = gql`
query {
    viewer{
      login
    }
  }
`
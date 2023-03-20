import gql from "graphql-tag";
import { apolloClient } from "./Apollo/apolloClient";

const PROXY_SERVER_URI = process.env.REACT_APP_PROXY_SERVER_URI;

export const fetchCurrentLogin = async () => {
    const result = await apolloClient.query({ query: getCurrentLoginQuery });
    return result.data.viewer.login;
}

export const fetchAccessToken = async (code: string) => {
    const response = await fetch(`${PROXY_SERVER_URI}/getAccessToken?code=${code}`)
    const data = await response.json()
    //github oauth error format, error key contains error message
    if ('error' in data) throw new Error(data.error);
    return data.access_token
}

const getCurrentLoginQuery = gql`
query {
    viewer{
      login
    }
  }
`
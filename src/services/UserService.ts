import { apolloClient } from './Apollo/apolloClient';
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

//A query that allows us to get the info of a user using their login
export const getUserInfoQuery = gql`
query ($login: String!){
    user (login: $login){
      name
      login
      avatarUrl
    }
  }
`

/**An interface that the data from the api is parsed to */
export interface UserInfo {
  login: string,
  name?: string,
  avatarUrl: string
}
/**
 * A hook that queries the graphql api and parses the data into a friendly format usuable by our application
 * @param username the login of the user we want to fetch their data
 * @returns user related informations like their name and avatarUrl
 */
export const useUserInfo = (username: string): UserInfo | null => {
  const { data } = useQuery(getUserInfoQuery, { variables: { login: username } })
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (data === undefined) {
      setUserInfo(null)
    } else {
      setUserInfo({ ...data.user })
    }
  }, [data])

  return userInfo;
}

/**Query that allows us to search for users by their login*/
export const searchForUserQuery = gql`
query searchForUser($queryString: String!) { 
    search (type: USER, query: $queryString, first:5) {
      edges {
        node {
          ... on User {
            login
          }
        }
      }
    }
  }
`

export const searchForUser = async (query: string): Promise<string[]> => {
  if (query === "") return []
  const result = await apolloClient.query({ query: searchForUserQuery, variables: { queryString: query } })
  const edges = (result.data.search.edges as any[])
  //weirdly enough if you type hello as a query the first node will be completely empty and i don't know why
  //this behaviour is consistant in Github's Graphiql Explorer
  return edges.map(({ node }) => node.login).filter((user) => user !== undefined)
}

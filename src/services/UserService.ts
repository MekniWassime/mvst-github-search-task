import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export const searchForUserQuery = gql`
query searchForUser($queryString: String!) { 
    search (type: USER, query: $queryString, first:2) {
      edges {
        node {
          ... on User {
            name
            login
          }
        }
      }
    }
  }
`

export interface UserInfo {
    login: string,
    name?: string,
    avatarUrl: string
}

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

export const getUserInfoQuery = gql`
query ($login: String!){
    user (login: $login){
      name
      login
      avatarUrl
    }
  }
`


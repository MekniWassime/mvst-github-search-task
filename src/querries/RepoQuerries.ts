import { apolloClient } from './../services/Apollo/apolloClient';
import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
export const searchRepoByUser = gql`
query searchRepoByUser($queryString: String!) { 
    search (type: REPOSITORY, query: $queryString, first:100) {
      edges {
        node {
          ... on Repository {
            id
            name
			pushedAt
            primaryLanguage {
              id
              name
            }
          }
        }
      }
    }
  }
`

export interface RepositoryInfo {
    id: string,
    name: string,
    pushedAt?: Date,
    primaryLanguage?: string;
}

export const useSearchRepoByUser = (queryString: string): { data: RepositoryInfo[], loading: boolean } => {
    const { data, loading } = useQuery(searchRepoByUser, { variables: { queryString } })
    if (data === undefined) return { data: [], loading }
    const edges = data.search.edges
    const repositories = (edges as any[]).map(({ node }) => ({
        id: node.id,
        name: node.name,
        pushedAt: node.pushedAt ? new Date(node.pushedAt) : undefined,
        primaryLanguage: node.primaryLanguage?.name
    } as RepositoryInfo))

    return { data: repositories, loading };
}

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
    name: string,
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

export const getCurrentLogin = async () => {
    const result = await apolloClient.query({ query: getCurrentLoginQuery });
    return result.data.viewer.login;
}

export const getCurrentLoginQuery = gql`
query {
    viewer{
      login
    }
  }
`
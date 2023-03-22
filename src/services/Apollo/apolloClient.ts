

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { store } from '../../store';
import { setContext } from 'apollo-link-context'


const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql', });
/**
 * Reads the accessToken from local storage and adds it automatically to requests to the graphql api
 * Authentication is required to user the github GraphQl API unlike the REST API
 */
const authLink = setContext((_, { headers, ...context }) => {
    const token = localStorage.getItem("accessToken")
    return {
        headers: {
            ...headers,
            ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        ...context,
    };
});

const cache = new InMemoryCache({});

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([(authLink as any), httpLink]),
    cache,
})
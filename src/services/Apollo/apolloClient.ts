

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { store } from '../../store';
import { setContext } from 'apollo-link-context'


const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql', });

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

// export const useAppApolloClient = () => {
//     return new ApolloClient({
//         link: ApolloLink.from([(authLink as any), httpLink]),
//         cache,
//     });
// };

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([(authLink as any), httpLink]),
    cache,
})
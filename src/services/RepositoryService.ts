import { gql, useQuery } from "@apollo/client"
/**query used to fetch repositories from the graphql api*/
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
            url
            viewerHasStarred
            stargazerCount
          }
        }
      }
    }
  }
`
/**An interface that the data from the api is parsed to */
export interface RepositoryInfo {
  id: string,
  name: string,
  pushedAt?: Date,
  primaryLanguage?: string,
  url: string,
  isStarred: boolean,
  stars: number
}
/**
 * A hook that queries the graphql api and parses the data into a friendly format usuable by our application
 * @param queryString string that is going to get passed to the graphql query
 * @returns a list of repositories that match the search query and the loading state
 */
export const useSearchRepoByUser = (queryString: string): { data: RepositoryInfo[], loading: boolean } => {
  const { data, loading } = useQuery(searchRepoByUser, { variables: { queryString } })
  if (data === undefined) return { data: [], loading }
  const edges = data.search.edges
  const repositories = (edges as any[]).map(({ node }) => ({
    id: node.id,
    name: node.name,
    pushedAt: node.pushedAt ? new Date(node.pushedAt) : undefined,
    primaryLanguage: node.primaryLanguage?.name,
    url: node.url,
    isStarred: node.viewerHasStarred,
    stars: node.stargazerCount
  } as RepositoryInfo))

  return { data: repositories, loading };
}
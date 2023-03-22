import { gql, useQuery } from "@apollo/client"

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

export interface RepositoryInfo {
  id: string,
  name: string,
  pushedAt?: Date,
  primaryLanguage?: string,
  url: string,
  isStarred: boolean,
  stars: number
}

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
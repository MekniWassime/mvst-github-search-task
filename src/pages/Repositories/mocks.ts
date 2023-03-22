import { MockedResponse } from "@apollo/react-testing";
import { searchRepoByUser } from "../../services/RepositoryService";
import { getUserInfoQuery } from "../../services/UserService";

export const mockedApolloClientResponses: MockedResponse[] = [
    {
        request: {
            query: searchRepoByUser,
            variables: { queryString: "user:MekniWassime" }
        },
        result: {
            data: {
                search: {
                    edges: [
                        {
                            node: {
                                id: "azerty",
                                name: "MekniWassime/devops-project",
                                pushedAt: new Date(),
                                primaryLanguage: "TavaScript",
                                url: "https://github.com/MekniWassime/devops-project",
                                viewerHasStarred: false,
                                stargazerCount: 5
                            },
                        },
                        {
                            node: {
                                id: "abcdefg",
                                name: "MekniWassime/mvst-github-search-task",
                                pushedAt: new Date(),
                                primaryLanguage: "TypeScript",
                                url: "https://github.com/MekniWassime/devops-project",
                                viewerHasStarred: true,
                                stargazerCount: 3
                            },
                        },
                    ]
                }
            }
        }
    },
    {
        request: {
            query: searchRepoByUser,
            variables: { queryString: "mvst user:MekniWassime" }
        },
        result: {
            data: {
                search: {
                    edges: [
                        {
                            node: {
                                id: "abcdefg",
                                name: "MekniWassime/mvst-github-search-task",
                                pushedAt: new Date(),
                                primaryLanguage: "TypeScript",
                                url: "https://github.com/MekniWassime/devops-project",
                                viewerHasStarred: true,
                                stargazerCount: 3
                            },
                        },
                    ]
                }
            }
        }
    },
    {
        request: {
            query: getUserInfoQuery,
            variables: { login: "MekniWassime" }
        },
        result: {
            data: {
                user: {
                    name: "Mekni_Wassime",
                    login: "MekniWassime",
                    avatarUrl: "https://avatars.githubusercontent.com/u/60438665?u=31a53af71f017d9b1864044f7333fb70d0a0e384&v=4"
                }
            }
        }
    }
]
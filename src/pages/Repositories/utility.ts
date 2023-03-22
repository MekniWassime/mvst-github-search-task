/**
 * The way that the graphql api search query is set up is that it accepts a query string that could contain advanced search paramters like the user, language or stars (and more)
 * @param searchString the string the user has typed in, this is used to query the names of the repositories
 * @param user the user that we should list their repositories
 * @param language filter the programming language of the repository
 * @param stars filter by stars equal, greater than, less than and in between two values are supported
 * @returns a query string that contains the information passed in as parameters in the following format
 * 
 * "`searchString` user:`user` [language:`language`] [stars:`stars`]"
 * 
 * [optional filters]
 */
export const buildQueryString = (
    searchString: string,
    user: string,
    language?: string,
    stars?: string
): string => {
    const strippedSearchString = stripPonctuation(searchString)
    return strippedSearchString +
        ` user:${user}` +
        (language ? ` language:${language}` : '') +
        (stars ? ` stars:${stars}` : '');
}

/**
 * Remove `:` from strings to stop the user from typing in their own advanced queries like `user:jhondoe` 
 * @param s string to strip `:` from
 * @returns `s` without the `:`
 */
const stripPonctuation = (s: string) => s.replace(/:/g, " ").replace(/\s{2,}/g, " ");
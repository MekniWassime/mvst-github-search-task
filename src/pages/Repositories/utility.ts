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
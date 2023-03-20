export const buildQueryString = (
    searchString: string,
    user: string,
    language?: string,
    stars?: string
): string => {
    return searchString +
        ` user:${user}` +
        (language ? ` language:${language}` : '') +
        (stars ? ` stars:${stars}` : '');
}
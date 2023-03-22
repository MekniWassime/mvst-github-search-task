import { buildQueryString } from "./utility"

describe('Testing the function that built function string', () => {
    test('Should include the search query, user, language and stars', () => {
        //Arrange: prepare the search query, user, language and stars arguments
        const [search, user, language, stars] = ["mvst", "MekniWassime", "TypeScript", "<10"];
        const expectedShouldInclude = [search, `user:${user}`, `language:${language}`, `stars:${stars}`];
        //Act: get the resulting query string from the function
        const actual = buildQueryString(search, user, language, stars);
        //Assert: the actual query should include all of the expected strings (order not important)
        expectedShouldInclude.forEach(expected => {
            expect(actual).toContain(expected)
        });
    })
    test('Generated query should be properly seperated by spaces', () => {
        //Arrange: prepare the search query, user, language and stars arguments
        const [search, user, language, stars] = ["mvst", "MekniWassime", "TypeScript", "<10"];
        const expectedNumberOfSpaces = 3;
        //Act: get the resulting query string from the function
        const builtQuery = buildQueryString(search, user, language, stars);
        const actualNumberOfSpaces = builtQuery.match(new RegExp(' ', 'g'))?.length;
        //Assert: the actual query should include all of the expected strings (order not important)
        expect(actualNumberOfSpaces).toEqual(expectedNumberOfSpaces)
    })
    test('Should omit language: and stars: if their respective arguments are undefined', () => {
        //Arrange: prepare the search query, user, language and stars arguments
        const [search, user, language, stars] = ["mvst", "MekniWassime", undefined, undefined];
        const expectedShouldInclude = [search, `user:${user}`];
        const expectedShouldNotInclude = ['stars:', 'language:']
        //Act: get the resulting query string from the function
        const actual = buildQueryString(search, user, language, stars);
        //Assert: the actual query should include all of the expected strings (order not important)
        expectedShouldInclude.forEach(expected => {
            expect(actual).toContain(expected)
        });
        expectedShouldNotInclude.forEach(notExpected => {
            expect(actual).not.toContain(notExpected)
        })
    })
})
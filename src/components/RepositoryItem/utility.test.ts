import { humanReadableDuration } from './utility';

describe('Testing humanReadableDuration utility function', () => {
    jest.useFakeTimers()
    const now = new Date("2023-03-21 12:00");
    jest.setSystemTime(now);
    test('should return just now', () => {
        //Arrange: get a date that is less than 5 seconds prior to now
        const date = new Date(now.getTime());
        date.setSeconds(now.getSeconds() - 4);
        const expected = "just now";
        //Act: get the string from the humanReadableDuration function
        const actual = humanReadableDuration(date)
        //Assert: the actual string should match the expected one
        expect(actual).toEqual(expected)
    });
    test('should return 1 year', () => {
        //Arrange: get a date that is between one and two years earlier than now
        const date = new Date(now.getTime());
        date.setMonth(now.getMonth() - 5)
        date.setFullYear(date.getFullYear() - 1);
        const expected = "1 year ago";
        //Act: get the string from the humanReadableDuration function
        const actual = humanReadableDuration(date)
        //Assert: the actual string should match the expected one
        expect(actual).toEqual(expected)
    })
    test('should return duration in proper plural form', () => {
        //Arrange: get two dates 5 hours and 1 hour earlier than now
        const dateOneHour = new Date(now.getTime());
        dateOneHour.setHours(now.getHours() - 1)
        const datefiveHours = new Date(now.getTime());
        datefiveHours.setHours(now.getHours() - 5)
        const expectedOneHour = "1 hour ago"
        const expectedFiveHours = "5 hours ago"
        //Act: get the actual strings from running the function twice
        const actualOneHour = humanReadableDuration(dateOneHour)
        const actualFiveHours = humanReadableDuration(datefiveHours)
        //Assert: that the plural form is correct for both the 1 month and 5 months
        expect(actualOneHour).toEqual(expectedOneHour)
        expect(actualFiveHours).toEqual(expectedFiveHours)
    })
})

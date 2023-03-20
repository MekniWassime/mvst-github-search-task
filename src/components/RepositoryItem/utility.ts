/**
 * Takes a date and returns a human readable statement in the format of `2 months ago` or `1 day ago` for example
 * works for years, months, days, hours, minutes, seconds in that order
 * @param date the date that you want to get the duration string for
 * @returns a human readable duration string
 */
export const humanReadableDuration = (date: Date) => {
    const durationInSeconds = Math.abs(Date.now() - date.getTime()) / 1000;
    const numberOfYears = Math.floor(durationInSeconds / (60 * 60 * 24 * 365))
    if (numberOfYears === 1)
        return "1 year ago"
    if (numberOfYears > 1)
        return `${numberOfYears} years ago`
    const numberOfMonths = Math.floor(durationInSeconds / (60 * 60 * 24 * 30))
    if (numberOfMonths === 1)
        return "1 month ago"
    if (numberOfMonths > 1)
        return `${numberOfMonths} months ago`
    const numberOfDays = Math.floor(durationInSeconds / (60 * 60 * 24))
    if (numberOfDays === 1)
        return "1 day ago"
    if (numberOfDays > 1)
        return `${numberOfDays} days ago`
    const numberOfHours = Math.floor(durationInSeconds / (60 * 60))
    if (numberOfHours === 1)
        return "1 hour ago"
    if (numberOfHours > 1)
        return `${numberOfHours} hours ago`
    const numberOfMinutes = Math.floor(durationInSeconds / 60)
    if (numberOfMinutes === 1)
        return "1 minute ago"
    if (numberOfMinutes > 1)
        return `${numberOfMinutes} minutes ago`
    const numberOfSeconds = Math.floor(durationInSeconds)
    if (numberOfSeconds >= 5)
        return `${numberOfSeconds} seconds ago`
    return 'just now'
}
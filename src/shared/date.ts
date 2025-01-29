export function formatDate(date: Date, locale: Intl.LocalesArgument = "ru-RU", timeZone: Intl.DateTimeFormatOptions["timeZone"] = "Europe/Moscow") {
    const options: Intl.DateTimeFormatOptions = {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };

    const formatter = new Intl.DateTimeFormat(locale, options);
    const formattedDate = formatter.format(date).split(".").reverse().join("-");
    return formattedDate;
}

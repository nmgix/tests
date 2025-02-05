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

export const regexYYYYMMDD = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export function parseDateWithTimezone(
    dateString: string,
    locale: Intl.LocalesArgument = "ru-RU",
    timeZone: Intl.DateTimeFormatOptions["timeZone"] = "Europe/Moscow",
) {
    const date = new Date(`${dateString}T00:00:00.000Z`);
    const formatter = new Intl.DateTimeFormat(locale, { timeZone });
    const offsetMinutes = new Date(formatter.format(date)).getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offsetMinutes);
    return date;
}

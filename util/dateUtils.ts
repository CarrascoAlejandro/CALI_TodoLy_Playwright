export function getOneMonthFromToday(): Date {
    const today = new Date();
    const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
    return nextMonth;
}

export function formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function formatDateToMatchView(date: Date): string {
    // Returns a date in the format "DD MMM" if the year is the current year, otherwise "DD MMM YYYY"
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    const currentYear = new Date().getFullYear();
    const dateYear = date.getFullYear();
    
    if (currentYear !== dateYear) {
        return `${formattedDate} ${dateYear}`;
    }

    console.log(formattedDate);
    
    return formattedDate;
}
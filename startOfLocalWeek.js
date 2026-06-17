// Function outputs ISO timestamp of the start of the local week SUNDAY
const getStartOfLocalWeekInUTC = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = sunday , 6 = saturday, LOCAL

    // Example: days since Sunday (0 = Sunday, so no effect)
    const daysSinceSunday = day;

    const startOfLocalWeek = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - daysSinceSunday, // Rewind to Sunday local
        0, 0, 0, 0 // Set time to 00:00:00.000
    );

    // Return ISO 8601 UTC timestamp string
    return startOfLocalWeek.toISOString();
}

export default getStartOfLocalWeekInUTC;
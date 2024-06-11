import { Entry } from "./Entry";

class Log {
    private _entries: Array<Entry>;

    constructor(entries: Array<Entry>) {
        this._entries = entries;
    }

    get entries(): Array<Entry> {
        return this._entries;
    }
    getEntryBetween(startDate: Date, endDate: Date): Array<Entry> {
        return this._entries.filter(entry =>
            entry.timestamp >= startDate && entry.timestamp <= endDate
        );
    }
    getEntryByUserId(userID: string) {
        return this._entries.filter(entry => entry.utente.id === userID);
    }
    getEntryAtDate(day: Date) {
        // Get all entries in a day (from 00:00 to 23:59)
        const startDate = new Date(day);
        const endDate = new Date(day);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        return this.getEntryBetween(startDate, endDate);
    }
}
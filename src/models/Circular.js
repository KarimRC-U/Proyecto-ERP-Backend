export class Circular {
    constructor({ title, sentFrom, sentTo = [], date, message }) {
        this.title = title;
        this.sentFrom = sentFrom;
        this.sentTo = sentTo;
        this.date = date;
        this.message = message;
    }
}
export class Circular {
    constructor({ id, title, sentFrom, sentTo = [], date, message }) {
        this.id = id;
        this.title = title;
        this.sentFrom = sentFrom;
        this.sentTo = sentTo;
        this.date = date;
        this.message = message;
    }
}
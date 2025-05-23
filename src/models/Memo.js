import { Staff } from "./Staff.js"

export class Memo {
    constructor({
        sentFrom,
        sentTo = [],
        date,
        attachments = false, 
        memoType,
        body 
    }) {
        this.sentFrom = sentFrom instanceof Staff ? sentFrom : new Staff(sentFrom);
        this.sentTo = Array.isArray(sentTo)
            ? sentTo.map(staff => staff instanceof Staff ? staff : new Staff(staff))
            : [];
        this.date = date;
        this.attachments = attachments;
        this.memoType = memoType;
        this.body = body;
    }
}
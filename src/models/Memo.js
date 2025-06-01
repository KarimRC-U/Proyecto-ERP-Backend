import { Staff } from "./Staff.js"

export class Memo {
    static allowedTypes = ["sent", "received"];

    constructor({
        id,
        sentFrom, 
        sentTo = [],
        date,
        attachments = false,
        memoType,
        body
    }) {
        this.id = id;
        this.sentFrom = sentFrom;
        this.sentTo = Array.isArray(sentTo) ? sentTo : [];
        this.date = date;
        this.attachments = attachments;
        this.memoType = Memo.allowedTypes.includes(memoType) ? memoType : "sent";
        this.body = body;
    }
}
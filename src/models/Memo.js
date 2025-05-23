import { Staff } from "./Staff.js"

export class Memo {
    constructor({
        memoNo,
        sentFrom, 
        sentTo = [],
        date,
        attachments = false,
        memoType,
        body
    }) {
        this.memoNo = memoNo;
        this.sentFrom = sentFrom;
        this.sentTo = Array.isArray(sentTo) ? sentTo : [];
        this.date = date;
        this.attachments = attachments;
        this.memoType = memoType;
        this.body = body;
    }
}
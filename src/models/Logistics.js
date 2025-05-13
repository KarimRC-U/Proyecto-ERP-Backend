export class Logistics {
    static allowedStatuses = ["Pending", "Approved", "Rejected", "Completed"];

    constructor({ title, purpose, amount, requestedBy, sentTo, date, status = "Pending" }) {
        this.title = title;
        this.purpose = purpose;
        this.amount = amount;
        this.requestedBy = requestedBy;
        this.sentTo = sentTo;
        this.date = date;
        this.status = Logistics.allowedStatuses.includes(status) ? status : "Pending";
    }
}
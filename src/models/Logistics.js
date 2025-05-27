export class Logistics {
    static allowedStatuses = ["Pending", "Approved", "Rejected", "Completed"];

    constructor({ id, title, purpose, amount, requestedBy, sentTo, date, status = "Pending" }) {
        this.id = id;
        this.title = title;
        this.purpose = purpose;
        this.amount = amount;
        this.requestedBy = requestedBy;
        this.sentTo = sentTo;
        this.date = date;
        this.status = Logistics.allowedStatuses.includes(status) ? status : "Pending";
    }
}
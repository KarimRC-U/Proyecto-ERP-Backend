export class Payroll {
    static allowedStatuses = ["Pending", "Paid", "Canceled", "Unknown"];

    constructor({ id, paymentName, description, date, paymentMonth, paymentYear, status = "Unknown" }) {
        this.id = id;
        this.paymentName = paymentName;
        this.description = description;
        this.date = date;
        this.paymentMonth = paymentMonth;
        this.paymentYear = paymentYear;
        this.status = Payroll.allowedStatuses.includes(status) ? status : "Unknown";
    }
}
export class Payroll {
    static allowedStatuses = ["Pending", "Paid", "Canceled", "Unknown"];

    constructor({ paymentName, description, date, paymentMonth, paymentYear, status = "Unknown" }) {
        this.paymentName = paymentName;
        this.description = description;
        this.date = date;
        this.paymentMonth = paymentMonth;
        this.paymentYear = paymentYear;
        this.status = Payroll.allowedStatuses.includes(status) ? status : "Unknown";
    }
}
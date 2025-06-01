export class Budget {
    static allowedStatus = ["approved", "modified", "pending"];

    constructor({ id, description, budgetedAmount, actualAmount = 0, variance = 0, date, status }) {
        this.id = id;
        this.description = description;
        this.budgetedAmount = budgetedAmount;
        this.actualAmount = actualAmount;
        this.variance = variance || (budgetedAmount - actualAmount);
        this.date = date;
        this.status = Budget.allowedStatus.includes(status) ? status : 'None';
    }
}
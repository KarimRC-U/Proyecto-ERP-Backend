export class Budget {
  
    static allowedStatus = ["approved", "modified", "pending"];

    constructor({ budgetNo, description, budgetedAmount, actualAmount = 0, variance = 0, date }) {
        this.budgetNo = budgetNo;
        this.description = description;
        this.budgetedAmount = budgetedAmount;
        this.actualAmount = actualAmount;
        this.variance = variance || (budgetedAmount - actualAmount);
        this.date = date;
        this.status = Budget.allowedStatus.includes(status) ? status : 'None';
    }
}
export class Payslip {
    constructor({
        id,
        staffid,
        staffName,
        title,
        level,
        basicSalary,
        housingAllowance = 0,
        transportAllowance = 0,
        utilityAllowance = 0,
        productivityAllowance = 0,
        communicationAllowance = 0,
        inconvenienceAllowance = 0,
        taxOrPaye = 0,
        pension = 0
    }) {
        this.id = id;
        this.staffid = staffid;
        this.staffName = staffName;
        this.title = title;
        this.level = level;
        this.basicSalary = basicSalary;
        this.housingAllowance = housingAllowance;
        this.transportAllowance = transportAllowance;
        this.utilityAllowance = utilityAllowance;
        this.productivityAllowance = productivityAllowance;
        this.communicationAllowance = communicationAllowance;
        this.inconvenienceAllowance = inconvenienceAllowance;
        this.allowancesTotal =
            housingAllowance +
            transportAllowance +
            utilityAllowance +
            productivityAllowance +
            communicationAllowance +
            inconvenienceAllowance;
        this.grossSalary = basicSalary + this.allowancesTotal;
        this.taxOrPaye = taxOrPaye;
        this.pension = pension;
        this.deductionsTotal = taxOrPaye + pension;
        this.netSalary = this.grossSalary - this.deductionsTotal;
    }
}
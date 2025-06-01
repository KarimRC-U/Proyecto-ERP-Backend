export class Salary {
    constructor({ id, title, level, basicSalary, allowance = 0, deductions = 0 }) {
        this.id = id;
        this.title = title;
        this.level = level;
        this.basicSalary = basicSalary;
        this.allowance = allowance;
        this.grossSalary = basicSalary + allowance;
        this.deductions = deductions;
        this.netSalary = this.grossSalary - deductions;
    }
}
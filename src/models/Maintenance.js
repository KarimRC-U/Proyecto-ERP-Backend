export class MaintenanceSchedule {
    static allowedStatuses = ["Pending", "Completed", "Canceled", "Unknown"];

    constructor({ id, itemName, itemNumber, date, type, isRecurring = false, status = "Unknown" }) {
        this.id = id;
        this.itemName = itemName;
        this.itemNumber = itemNumber;
        this.date = date;
        this.type = type;
        this.isRecurring = isRecurring;
        this.status = MaintenanceSchedule.allowedStatuses.includes(status) ? status : "Unknown";
    }
}
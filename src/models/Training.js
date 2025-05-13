export class Training {
    static allowedStatuses = ["Scheduled", "Ongoing", "Completed", "Canceled"];

    constructor({ description, startDate, type, duration, mode, status = "Scheduled" }) {
        this.description = description;
        this.startDate = startDate;
        this.type = type;
        this.duration = duration;
        this.mode = mode;
        this.status = Training.allowedStatuses.includes(status) ? status : "Scheduled";
    }
}
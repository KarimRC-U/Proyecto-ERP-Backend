export class Training {
    static allowedStatuses = ["Scheduled", "Ongoing", "Completed", "Canceled"];

    constructor({ id, description, startDate, type, duration, mode, status = "Scheduled" }) {
        this.id = id;
        this.description = description;
        this.startDate = startDate;
        this.type = type;
        this.duration = duration;
        this.mode = mode;
        this.status = Training.allowedStatuses.includes(status) ? status : "Scheduled";
    }
}
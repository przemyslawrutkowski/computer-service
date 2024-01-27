import { Status } from './Status';
import { Priority } from './Priority';

export class Report {
    private id: string;
    private description: string;
    private priority: Priority;
    private status: Status;
    private price?: number;
    private startDate: Date;
    private endDate?: Date;
    private userId: string;
    private servicemanId?: string;

    constructor(description: string, priority: Priority, status: Status, startDate: Date, userId: string) {
        this.id = "";
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.startDate = startDate;
        this.userId = userId;
    }

    static fromObject(object: any): Report {
        const report = new Report(object.description, object.priority, object.status, new Date(object.startDate), object.userId);
        report.setReportId(object.id);
        report.setPrice(object.price);
        if (object.endDate) {
            report.setEndDate(new Date(object.endDate));
        }

        return report;
    }

    getReportId(): string {
        return this.id;
    }

    setReportId(id: string): void {
        this.id = id;
    }

    getUserId(): string {
        return this.id;
    }

    getDescription(): string {
        return this.description;
    }

    setDescription(value: string) {
        this.description = value;
    }

    getPriority(): Priority {
        return this.priority;
    }

    setPriority(value: Priority) {
        this.priority = value;
    }

    getStatus(): Status {
        return this.status;
    }

    setStatus(value: Status) {
        this.status = value;
    }

    getPrice(): number | undefined {
        return this.price;
    }

    setPrice(value: number | undefined) {
        this.price = value;
    }

    getStartDate(): Date {
        return this.startDate;
    }

    setStartDate(value: Date) {
        this.startDate = value;
    }

    getEndDate(): Date | undefined {
        return this.endDate;
    }

    setEndDate(value: Date | undefined) {
        this.endDate = value;
    }
}
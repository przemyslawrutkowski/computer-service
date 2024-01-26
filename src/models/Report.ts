import { Status } from './Status';
import { Priority } from './Priority';

export class Report {
    private static idCounter: number = 0;

    private id: number;
    private description: string;
    private priority: Priority;
    private status: Status;
    private price?: number;
    private startDate: Date;
    private endDate?: Date;
    private userId: number;
    private servicemanId?: number;

    constructor(description: string, priority: Priority, status: Status, startDate: Date, userId: number) {
        this.id = Report.idCounter++;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.startDate = startDate;
        this.userId = userId;
    }

    getReportId(): number {
        return this.id;
    }
    getUserId(): number {
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
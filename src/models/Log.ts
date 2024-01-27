import { Status } from "./Status";

export class Log {
    private id: string;
    private reportId: string;
    private status: Status;
    private price: number;
    private logDate: Date;

    constructor(reportId: string, status: Status, price: number, logDate: Date) {
        this.id = "";
        this.reportId = reportId;
        this.status = status;
        this.price = price;
        this.logDate = logDate;
    }
    static fromObject(object: any): Log {
        const log = new Log(object.reportId, object.status, object.price, new Date(object.logDate));
        log.setId(object.id);
        return log;
    }


    getId(): string {
        return this.id;
    }
    setId(id: string): void {
        this.id = id;
    }
    getReportId(): string {
        return this.reportId;
    }
    getStatus(): Status {
        return this.status;
    }
    getPrice(): number {
        return this.price;
    }
    getLogDate(): Date {
        return this.logDate;
    }
}
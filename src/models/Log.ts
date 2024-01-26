import { Status } from "./Status";

export class Log{
    private static idCounter: number = 0;
    private id: number;
    private reportId: number;
    private status: Status;
    private price: number;
    private logDate: Date;
    constructor(reportId: number, status: Status, price: number, logDate: Date){
        this.id = Log.idCounter++;
        this.reportId = reportId;
        this.status = status;
        this.price = price;
        this.logDate = logDate;
    }
    static fromObject(object: any): Log {
        return new Log(object.reportId,object.status,object.price,object.logDate);
    }


    getId(): number{
        return this.id;
    }
    getReportId(): number{
        return this.reportId;
    }
    getStatus(): Status{
        return this.status;
    }
    getPrice(): number{
        return this.price;
    }
    getLogDate(): Date{
        return this.logDate;
    }
}
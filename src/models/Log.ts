import { Status } from './Status'

export class Log {
	private id: string
	private reportId: string
	private status: Status
	private price: number
	private logDate: Date
	private preRead: Boolean

	constructor(reportId: string, status: Status, price: number, logDate: Date, preRead: Boolean) {
		this.id = ''
		this.reportId = reportId
		this.status = status
		this.price = price
		this.logDate = logDate
		this.preRead = preRead
	}
	static fromObject(object: any): Log {
		const log = new Log(object.reportId, object.status, object.price, new Date(object.logDate), object.preRead)
		log.setId(object.id)
		return log
	}

	getId(): string {
		return this.id
	}
	setId(id: string): void {
		this.id = id
	}
	getReportId(): string {
		return this.reportId
	}
	getStatus(): Status {
		return this.status
	}
	getPrice(): number {
		return this.price
	}
	getLogDate(): Date {
		return this.logDate
	}
	getpreRead(): Boolean {
		return this.preRead
	}
	setpreRead(preRead: Boolean): void {
		this.preRead = preRead
	}
}

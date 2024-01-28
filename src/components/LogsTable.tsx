import React from 'react'
import { Log } from '../models/Log'
import { deleteLog } from '../services/LogService'
import TableHeaders from '../reusableComponents/tableHeaders'

interface LogTableProps {
	logs: Log[]
	isServiceman: Boolean
	onDelete: () => void
}

const LogsTable: React.FC<LogTableProps> = ({ logs, isServiceman, onDelete }) => {
	const handleDelete = async (logId: string) => {
		try {
			await deleteLog(logId)
			onDelete()
		} catch (error) {
			console.error(`Failed to delete log with ID ${logId}`, error)
		}
	}

	return (
		<table border={1}>
			<TableHeaders titles={['ID', 'Report ID', 'Status', 'Price', 'Log Date', 'Delete']} optionalLast={isServiceman} />
			<tbody>
				{logs.length > 0 ? (
					logs.map(log => (
						<tr key={log.getId()}>
							<td>{log.getId()}</td>
							<td>{log.getReportId()}</td>
							<td>{log.getStatus()}</td>
							<td>{log.getPrice()}</td>
							<td>{new Date(log.getLogDate()).toLocaleString('pl-PL')}</td>
							{isServiceman && (
								<td>
									<button className="delete" onClick={() => handleDelete(log.getId())}>
										Delete
									</button>
								</td>
							)}
						</tr>
					))
				) : (
					<tr>
						<td colSpan={isServiceman ? 6 : 5}>Log list is empty</td>
					</tr>
				)}
			</tbody>
		</table>
	)
}

export default LogsTable

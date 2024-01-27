import React from 'react'
import { Log } from '../models/Log'
import { deleteLog } from '../services/LogService'

interface LogTableProps {
	logs: Log[]
	onDelete: () => void
}

const LogsTable: React.FC<LogTableProps> = ({ logs, onDelete }) => {
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
			<thead>
				<tr>
					<th>ID</th>
					<th>Report ID</th>
					<th>Status</th>
					<th>Price</th>
					<th>Data logu</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{logs.map(log => (
					<tr key={log.getId()}>
						<td>{log.getId()}</td>
						<td>{log.getReportId()}</td>
						<td>{log.getStatus()}</td>
						<td>{log.getPrice()}</td>
						<td>{new Date(log.getLogDate()).toLocaleString('pl-PL')}</td>
						<td>
							<button className="delete" onClick={() => handleDelete(log.getId())}>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default LogsTable

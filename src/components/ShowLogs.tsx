import { useEffect, useState } from 'react'
import { getLogs } from '../services/LogService'
import { Log } from '../models/Log'
import '../styles/logs.css'

const ShowLogs = () => {
	const [logs, setLogs] = useState<Log[]>([])

	useEffect(() => {
		const fetchLogs = async () => {
			try {
				const fetchedLogs = await getLogs()
				const logsInstances = fetchedLogs.map((logs: any) => Log.fromObject(logs))
				setLogs(logsInstances)
			} catch (error) {
				console.error('Error fetching logs:', error)
			}
		}

		fetchLogs()
	}, [])

	return (
		<section className="logs">
			<h2>Logs List</h2>
			<table border={1}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Report ID</th>
						<th>Status</th>
						<th>Price</th>
						<th>Data logu</th>
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
						</tr>
					))}
				</tbody>
			</table>
			<button className="exit">
				<a href="/reports">X</a>
			</button>
		</section>
	)
}

export default ShowLogs

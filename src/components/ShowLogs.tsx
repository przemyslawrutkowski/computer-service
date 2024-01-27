import { useEffect, useState } from 'react'
import { getLogs } from '../services/LogService'
import { Log } from '../models/Log'
import LogsTable from './LogsTable';
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
			<LogsTable logs={logs} />
			<button className="exit">
				<a href="/reports">X</a>
			</button>
		</section>
	)
}

export default ShowLogs

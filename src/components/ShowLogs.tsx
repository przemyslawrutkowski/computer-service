import { useEffect, useState } from 'react'
import { getLogs } from '../services/LogService'
import { Log } from '../models/Log'
import LogsTable from './LogsTable'
import Header from '../reusableComponents/header'
import { UserLocalStorage } from '../services/UserLocalStorage'
import '../styles/logs.css'
import LogoutBtn from '../reusableComponents/logoutBtn'

const ShowLogs = () => {
	const [logs, setLogs] = useState<Log[]>([])
	const [isServiceman, setIsServiceman] = useState<boolean>(false)

	const fetchLogs = async () => {
		try {
			const fetchedLogs = await getLogs()
			const logsInstances = fetchedLogs.map((logs: any) => Log.fromObject(logs))
			setLogs(logsInstances)
		} catch (error) {
			console.error('Error fetching logs:', error)
		}
	}

	useEffect(() => {
		const userLocalStorage = new UserLocalStorage()
		const userData = userLocalStorage.getUserData()
		if (userData) {
			setIsServiceman(userData.isServiceman || false)
		}
		fetchLogs()
	}, [])

	return (
		<>
			<section className="logs">
			<Header content={'Logs List'} />
				<LogsTable logs={logs} isServiceman={isServiceman} onDelete={fetchLogs} />
				<button className="exit">
					<a href="/reports">X</a>
				</button>
			</section>
			<LogoutBtn />
		</>
	)
}

export default ShowLogs

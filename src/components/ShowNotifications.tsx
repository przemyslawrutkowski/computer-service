import Header from '../reusableComponents/header'
import { getLogs, updateLog } from '../services/LogService'
import { useEffect, useState } from 'react'
import { Log } from '../models/Log'
import '../styles/notifications.css'
import { UserLocalStorage } from '../services/UserLocalStorage'
import Link from '../reusableComponents/link'

const ReportsTable = () => {
	const [logs, setLogs] = useState<Log[]>([])
	const [isVisible, setIsVisible] = useState(false)

	const fetchLogs = async () => {
		try {
			const fetchedLogs = await getLogs()
			let logsInstances = fetchedLogs.map(log => Log.fromObject(log))
			logsInstances = logsInstances.filter(log => !log.getpreRead())

			if (logsInstances.length > 0) {
				setIsVisible(true)
				logsInstances.forEach(log => {
					log.setpreRead(true)
					updateLog(log.getId(), log)
				})
				setLogs(logsInstances)

				setTimeout(() => {
					setIsVisible(false)
				}, logsInstances.length * 2000)
			}
		} catch (error) {
			console.error('Error fetching logs:', error)
		}
	}

	useEffect(() => {
		const userLocalStorage = new UserLocalStorage()
		const userData = userLocalStorage.getUserData()
		if (userData && !userData.isServiceman) fetchLogs()
	}, [])

	if (!isVisible) {
		return null
	}

	return (
		<div className="background">
			<section className="notifications">
				<Header content={'Notifications'} />
				{logs.map(log => (
					<p key={log.getId()}>
						Report id: {log.getReportId()} changed to {log.getStatus()} on time:{' '}
						{new Date(log.getLogDate()).toLocaleString('pl-PL')}
					</p>
				))}
				<Link content="For More Info Click This Link" link="showLogs" />
			</section>
		</div>
	)
}

export default ReportsTable

import { useEffect, useState } from 'react'
import { getReport, getReports, updateReport } from '../services/ReportService'
import { Report } from '../models/Report'
import FilterReports from './FilterReports'
import ReportsTable from './ReportsTable'
import { UserLocalStorage } from '../services/UserLocalStorage'
import '../styles/reports.css'

const ShowReports = () => {
	const [reports, setReports] = useState<InstanceType<typeof Report>[]>([])
	const [filters, setFilters] = useState<Partial<Report>>({})
	const [isServiceman, setIsServiceman] = useState<boolean>(false)
	const [servicemanId, setServicemanId] = useState<number>(-1)

	useEffect(() => {
		const fetchReports = async () => {
			try {
				const fetchedReports = await getReports()
				const reportInstances = fetchedReports.map((report: any) => Report.fromObject(report))
				setReports(
					reportInstances.filter((report: Report) =>
						Object.entries(filters).every(([key, value]) => {
							if (!value) return true
							if (key === 'startDate') {
								const startDate = report.getStartDate()
								return startDate ? new Date(startDate) >= new Date(value.toString()) : false
							}
							if (key === 'endDate') {
								const endDate = report.getEndDate()
								if (endDate) {
									return new Date(endDate) <= new Date(value.toString())
								}
								return true
							}
							if (key === 'status') {
								return report.getStatus().toString() === value.toString()
							}
							if (key === 'priority') {
								return report.getPriority().toString() === value.toString()
							}
						})
					)
				)
			} catch (error) {
				console.error('Error fetching reports:', error)
			}
		}

		const userLocalStorage = new UserLocalStorage()
		const userData = userLocalStorage.getUserData()
		if (userData) {
			setIsServiceman(userData.isServiceman || false)
			setServicemanId(userData.userId)
		}

		fetchReports()
	}, [filters])

	const handleTakeReportClick = async (reportId: string) => {
		try {
			const takenreport = await getReport(reportId)

			const goodreport = Report.fromObject(takenreport)
			goodreport.setServicemanId(servicemanId.toString())

			const updatedReport = await updateReport(goodreport.getReportId(), goodreport)

			console.log(updatedReport)
		} catch (error) {
			console.error(error)
		}

		console.log(`Użytkownik kliknął w raport o ID ${reportId}`)
	}

	const handleFilterChange = (newFilters: Partial<Report>) => {
		setFilters(newFilters)
	}

	return (
		<>
			<section className="reports">
				{' '}
				<h3>Reports List</h3>
				<FilterReports onFilterChange={handleFilterChange} />
				<ReportsTable
					reports={reports}
					isServiceman={isServiceman}
					servicemanId={servicemanId}
					handleTakeReportClick={handleTakeReportClick}
				/>
				<button className="newReport">
					<a href="/addReport">New Report</a>
				</button>
				<button className="showlogs">
					<a href="/showlogs">Show Logs</a>
				</button>
			</section>
			<button className="logout">
				<a href="/">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path
							fill="#cd3050"
							d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
						/>
					</svg>
				</a>
			</button>
		</>
	)
}

export default ShowReports

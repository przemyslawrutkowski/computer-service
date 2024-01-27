import { useEffect, useState } from 'react'
import { getReports } from '../services/ReportService'
import { Link } from 'react-router-dom'
import { Report } from '../models/Report'
import FilterReports from './FilterReports'
import '../styles/reports.css'

const ShowReports = () => {
	const [reports, setReports] = useState<InstanceType<typeof Report>[]>([])
	const [filters, setFilters] = useState<Partial<Report>>({})

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
		fetchReports()
	}, [filters])

	const handleFilterChange = (newFilters: Partial<Report>) => {
		setFilters(newFilters)
	}

	return (
		<section className="reports">
			{' '}
			<h3>Reports List</h3>
			<FilterReports onFilterChange={handleFilterChange} />
			<table border={1}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Description</th>
						<th>Priority</th>
						<th>Status</th>
						<th>Price</th>
						<th>Start Date</th>
						<th>End Date</th>
						<th>User ID</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>
					{reports.map(report => (
						<tr key={report.getReportId()}>
							<td>{report.getReportId()}</td>
							<td>{report.getDescription()}</td>
							<td>{report.getPriority()}</td>
							<td>{report.getStatus()}</td>
							<td>{report.getPrice() ?? 'Brak'}</td>
							<td>{new Date(report.getStartDate()).toLocaleString('pl-PL')}</td>
							<td>
								{(() => {
									const endDate = report.getEndDate()
									return endDate ? new Date(endDate).toLocaleString('pl-PL') : 'Brak daty'
								})()}
							</td>
							<td>{report.getUserId()}</td>
							<td>
								<button>
									<Link to={`/edit/${report.getReportId()}`}>Edit</Link>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<button className="addReport">
				<a href="/addReport">New Report</a>
			</button>
			<button className="showlogs">
				<a href="/showlogs">Show Logs</a>
			</button>
		</section>
	)
}

export default ShowReports

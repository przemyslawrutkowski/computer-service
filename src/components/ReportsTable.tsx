import { Link } from 'react-router-dom'
import { Report } from '../models/Report'

interface ReportsTableProps {
	reports: Report[]
	isServiceman: boolean
	servicemanId: number
	handleTakeReportClick: (reportId: string) => void
}

const ReportsTable: React.FC<ReportsTableProps> = ({ reports, isServiceman, servicemanId, handleTakeReportClick }) => {
	return (
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
					{isServiceman && <th>Edit</th>}
				</tr>
			</thead>
			<tbody>
				{reports.map(report => {
					// console.log(`Serviceman ID for report ${report.getReportId()}:`, report)

					return (
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

							{isServiceman && (
								<td>
									{report.getServicemanId() === servicemanId.toString() && (
										<button>
											<Link to={`/edit/${report.getReportId()}`}>Edit</Link>
										</button>
									)}
									{(!report.getServicemanId() || report.getServicemanId() !== servicemanId.toString()) && (
										<button onClick={() => handleTakeReportClick(report.getReportId())}>Take report</button>
									)}
								</td>
							)}
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

export default ReportsTable

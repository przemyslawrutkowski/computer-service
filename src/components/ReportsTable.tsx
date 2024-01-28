import { Link } from 'react-router-dom'
import { Report } from '../models/Report'
import TableHeaders from '../reusableComponents/tableHeaders'
import Header from '../reusableComponents/header'

interface ReportsTableProps {
	reports: Report[]
	isServiceman: boolean
	servicemanId: number
	handleTakeReportClick: (reportId: string) => void
}

const ReportsTable: React.FC<ReportsTableProps> = ({ reports, isServiceman, servicemanId, handleTakeReportClick }) => {
	return (
		<table border={1}>
			<TableHeaders
				titles={['ID', 'Description', 'Priority', 'Status', 'Price', 'Start Date', 'End Date', 'User ID', 'Action']}
				optionalLast={isServiceman}
			/>
			<tbody>
				{reports.length > 0 ? (
					reports.map(report => {
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

										{report.getServicemanId() && report.getServicemanId() !== servicemanId.toString() && (
											<Header content="Taken" />
										)}

										{!report.getServicemanId() && (
											<button onClick={() => handleTakeReportClick(report.getReportId())}>Take report</button>
										)}
									</td>
								)}
							</tr>
						)
					})
				) : (
					<tr>
						<td colSpan={isServiceman ? 9 : 8}>Report list is empty</td>
					</tr>
				)}
			</tbody>
		</table>
	)
}

export default ReportsTable

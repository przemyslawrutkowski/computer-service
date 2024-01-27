import { Link } from 'react-router-dom';
import { Report } from '../models/Report';

interface ReportsTableProps {
    reports: Report[];
}

const ReportsTable: React.FC<ReportsTableProps> = ({ reports }) => {
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
    );
}

export default ReportsTable;
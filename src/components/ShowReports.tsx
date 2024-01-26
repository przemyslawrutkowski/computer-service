import { useEffect, useState } from 'react';
import { getReports } from '../services/ReportService';
import { Link } from 'react-router-dom';
import { Report } from '../models/Report';
import FilterReports from './FilterReports';

const ShowReports = () => {
  const [reports, setReports] = useState<InstanceType<typeof Report>[]>([]);
  const [filters, setFilters] = useState<Partial<Report>>({});

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const fetchedReports = await getReports();
        const reportInstances = fetchedReports.map((report: any) => Report.fromObject(report));
        setReports(reportInstances.filter((report: Report) =>
          Object.entries(filters).every(([key, value]) => {
            if (!value) return true;
            if (key === 'startDate') {
              const startDate = report.getStartDate();
              return startDate ? new Date(startDate) >= new Date(value.toString()) : false;
            }
            if (key === 'endDate') {
              const endDate = report.getEndDate();
              if (endDate) {
                return new Date(endDate) <= new Date(value.toString())
              }
              return true;
            }
            if (key === 'status') {
              return report.getStatus().toString() === value.toString();
            }
            if (key === 'priority') {
              return report.getPriority().toString() === value.toString();
            }
          })
        ));
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<Report>) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <h1>Lista Raportów</h1>
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
          {reports.map((report) => (
            <tr key={report.getReportId()}>
              <td>{report.getReportId()}</td>
              <td>{report.getDescription()}</td>
              <td>{report.getPriority()}</td>
              <td>{report.getStatus()}</td>
              <td>{report.getPrice() ?? 'Brak'}</td>
              <td>{report.getStartDate().toString()}</td>
              <td>{report.getEndDate()?.toString() ?? 'Brak daty'}</td>
              <td>{report.getUserId()}</td>
              <td><Link to={`/edit/${report.getReportId()}`}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default ShowReports;

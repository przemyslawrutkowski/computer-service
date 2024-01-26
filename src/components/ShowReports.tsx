import React, { useEffect, useState } from 'react';
import { getReports } from '../services/ReportService';
import { Priority } from '../models/Priority';
import { Status } from '../models/Status';
import { Link } from 'react-router-dom';


type ReportType = {
  id: number;
  description: string;
  priority: Priority;
  status: Status;
  price?: number;
  startDate: Date;
  endDate: Date;
  userId: number;
};

const ShowReports = () => {
  const [reports, setReports] = useState<ReportType[]>([]); // Określenie typu dla tablicy reports

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const fetchedReports = await getReports();
        setReports(fetchedReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h1>Lista Raportów</h1>
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
            <th>Edit</th> {}
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.description}</td>
              <td>{report.priority}</td>
              <td>{report.status}</td>
              <td>{report.price ?? 'Brak'}</td>
              <td>{report.startDate.toString()}</td>
              <td>{report.endDate ? report.endDate.toString() : 'Brak daty'}</td>
              <td>{report.userId}</td>
              <td>
                <Link to={`/edit/${report.id}`}>Edit</Link> {}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default ShowReports;

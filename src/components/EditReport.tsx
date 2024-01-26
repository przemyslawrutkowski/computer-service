import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getReport, updateReport } from '../services/ReportService';
import { Status } from '../models/Status';
import { Log } from '../models/Log';
import { addLog } from '../services/LogService';

const EditReport = () => {
  const navigate = useNavigate();
  const { reportid } = useParams<{ reportid: string }>();
  const [report, setReport] = useState({
    price: 0,
    status: Status.new,
  });
  const [currentReport, setCurrentReport] = useState<any>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const fetchedReport = await getReport(Number(reportid));
        setCurrentReport(fetchedReport);
        setReport({
          price: fetchedReport.price || 0,
          status: fetchedReport.status || Status.new,
        });
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };

    fetchReport();
  }, [reportid]);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  };

  const handleUpdateReport = async () => {
    try {
      await updateReport(Number(reportid), report);
      console.log(currentReport.startDate.toString());
      const log = new Log(currentReport.id, report.status, report.price, new Date());
      addLog(log);
      
      navigate('/reports');
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  return (
    <div>
      <h1>Edytuj Raport</h1>
      <form>
        <div>
          <label htmlFor="price">Cena:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={report.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={report.status}
            onChange={handleInputChange}
          >
            {Object.values(Status).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={handleUpdateReport}>
          Zapisz zmiany
        </button>
        
      </form>
    </div>
  );
};

export default EditReport;

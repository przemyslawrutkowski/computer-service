import React, { useEffect, useState } from 'react';
import { getLogs } from '../services/LogService';
import { Log } from '../models/Log';

const ShowLogs = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const fetchedLogs = await getLogs();
        const logsInstances = fetchedLogs.map((logs: any) => Log.fromObject(logs));
        setLogs(logsInstances);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <h1>Lista Logów</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Report ID</th>
            <th>Status</th>
            <th>Price</th>
            <th>Data logu</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.getId()}>
              <td>{log.getId()}</td>
              <td>{log.getReportId()}</td>
              <td>{log.getStatus()}</td>
              <td>{log.getPrice()}</td>
              <td>{log.getLogDate().toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowLogs;

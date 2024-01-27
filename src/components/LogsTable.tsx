import React from 'react';
import { Log } from '../models/Log';

interface LogTableProps {
    logs: Log[];
}

const LogsTable: React.FC<LogTableProps> = ({ logs }) => (
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
            {logs.map(log => (
                <tr key={log.getId()}>
                    <td>{log.getId()}</td>
                    <td>{log.getReportId()}</td>
                    <td>{log.getStatus()}</td>
                    <td>{log.getPrice()}</td>
                    <td>{new Date(log.getLogDate()).toLocaleString('pl-PL')}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default LogsTable;
import { Log } from "../models/Log";
import { UserLocalStorage } from "./UserLocalStorage";
import { getReports } from "./ReportService";
import { Report } from "../models/Report";


const LOGS_API_URL = 'http://localhost:3000/Logs';


export const getLogs = async (): Promise<Log[]> => {
  try {
    const userLocalStorage = new UserLocalStorage();
    const userData = userLocalStorage.getUserData();

    if (userData && !userData.isServiceman) {
      const userId = userData.userId;
      const reportsResponse = await getReports();

      if (!Array.isArray(reportsResponse)) {
        throw new Error('Reports response is not an array');
      }

      const reportIds = reportsResponse.map((report) => report.id);
      const logResponse = await fetch(`${LOGS_API_URL}?reportIds=${reportIds.join(',')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!logResponse.ok) {
        throw new Error('Failed to fetch logs');
      }

      const logs: Log[] = await logResponse.json();

      const logsInstances = logs.map((log: any) => Log.fromObject(log));
      const filteredLogs = logsInstances.filter((log) => reportIds.includes(log.getReportId()));

      return filteredLogs;
    } else {
      const response = await fetch(LOGS_API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      }

      const logs: Log[] = await response.json();
      return logs;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};




export const addLog = async (log: Log): Promise<Log> => {
  try {
    const response = await fetch(LOGS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(log),
    });

    if (!response.ok) {
      throw new Error('Failed to add log');
    }

    const addedLog = await response.json();
    return addedLog;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteLog = async (logId: string): Promise<void> => {
  try {
    const response = await fetch(`${LOGS_API_URL}/${logId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete log with ID ${logId}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

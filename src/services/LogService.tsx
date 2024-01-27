import { Log } from "../models/Log";

const LOGS_API_URL = 'http://localhost:3000/Logs';


export const getLogs = async (): Promise<Log[]> => {
  try {
    const response = await fetch(LOGS_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch logs');
    }

    const logs = await response.json();
    return logs;
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

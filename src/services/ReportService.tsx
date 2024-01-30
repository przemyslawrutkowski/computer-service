const REPORTS_API_URL = 'http://localhost:3000/reports';
import { Status } from "../models/Status";
import { UserLocalStorage } from "./UserLocalStorage";

export const getReports = async () => {
  try {
    const userLocalStorage = new UserLocalStorage();
    const userData = userLocalStorage.getUserData();

    if (userData && !userData.isServiceman) {
      const userId = userData.userId;
      const response = await fetch(`${REPORTS_API_URL}?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }

      const reports = await response.json();
      return reports;
    } else {
      const response = await fetch(REPORTS_API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }

      const reports = await response.json();
      return reports;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const createReport = async (reportData: any) => {
  try {
    const response = await fetch(REPORTS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    });

    if (!response.ok) {
      throw new Error('Failed to create report');
    }

    const createdReport = await response.json();
    return createdReport;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReport = async (reportid: string) => {
  
    try {
      const response = await fetch(`${REPORTS_API_URL}/${reportid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch report with ID ${reportid}`);
      }
  
      const report = await response.json();
      return report;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  export const updateReport = async (reportid: string, updatedData: any) => {
    try {
      if (updatedData.status === Status.solved) {
        updatedData.endDate = new Date();
      }
      else updatedData.endDate = "";
  
      const response = await fetch(`${REPORTS_API_URL}/${reportid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update report with ID ${reportid}`);
      }
  
      const updatedReport = await response.json();
      return updatedReport;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


import { useEffect, useState } from 'react'
import { getReport, getReports, updateReport } from '../services/ReportService'
import { Report } from '../models/Report'
import FilterReports from './FilterReports'
import ReportsTable from './ReportsTable'
import { UserLocalStorage } from '../services/UserLocalStorage'
import '../styles/reports.css'

const ShowReports = () => {
	const [reports, setReports] = useState<InstanceType<typeof Report>[]>([])
	const [filters, setFilters] = useState<Partial<Report>>({})
	const [isServiceman, setIsServiceman] = useState<boolean>(false)
	const [servicemanId, setServicemanId] = useState<number>(-1)

	useEffect(() => {
		const fetchReports = async () => {
			try {
				const fetchedReports = await getReports();
				const reportInstances = fetchedReports.map((report: any) => Report.fromObject(report));
				setReports(
					reportInstances.filter((report: Report) =>
						Object.entries(filters).every(([key, value]) => {
							if (!value) return true
							if (key === 'startDate') {
								const startDate = report.getStartDate()
								return startDate ? new Date(startDate) >= new Date(value.toString()) : false
							}
							if (key === 'endDate') {
								const endDate = report.getEndDate()
								if (endDate) {
									return new Date(endDate) <= new Date(value.toString())
								}
								return true
							}
							if (key === 'status') {
								return report.getStatus().toString() === value.toString()
							}
							if (key === 'priority') {
								return report.getPriority().toString() === value.toString()
							}
						})
					)
				)
			} catch (error) {
				console.error('Error fetching reports:', error)
			}
		}

	const userLocalStorage = new UserLocalStorage()
    const userData = userLocalStorage.getUserData()
    if (userData) {
      setIsServiceman(userData.isServiceman || false)
	  setServicemanId(userData.userId)
    }
	
	fetchReports()
	}, [filters])

	const handleTakeReportClick = async (reportId: string) => {
		try {
		  const takenreport = await getReport(reportId);
	  
		  const goodreport = Report.fromObject(takenreport);
		  goodreport.setServicemanId(servicemanId.toString());
	  
		  // Aktualizuj raport w bazie danych, wykorzystując updateReport
		  const updatedReport = await updateReport(goodreport.getReportId(), goodreport);
	  
		  // Możesz sprawdzić zaktualizowany raport, jeśli to konieczne
		  console.log(updatedReport);
	  
		  // Możesz wykonać inne operacje, jeśli to konieczne
		} catch (error) {
		  // Obsługa błędów, jeśli wystąpią problemy z obietnicą
		  console.error(error);
		}
	  
		console.log(`Użytkownik kliknął w raport o ID ${reportId}`);
	  };
	  
	  


	const handleFilterChange = (newFilters: Partial<Report>) => {
		setFilters(newFilters)
	}

	return (
		<section className="reports">
			{' '}
			<h3>Reports List</h3>
			<FilterReports onFilterChange={handleFilterChange} />
			<ReportsTable reports={reports} isServiceman={isServiceman} servicemanId={servicemanId} handleTakeReportClick={handleTakeReportClick}/>
			<button className="newReport">
				<a href="/addReport">New Report</a>
			</button>
			<button className="showlogs">
				<a href="/showlogs">Show Logs</a>
			</button>
		</section>
	)
}

export default ShowReports

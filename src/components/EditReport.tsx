import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getReport, updateReport } from '../services/ReportService'
import { Status } from '../models/Status'
import { Log } from '../models/Log'
import { addLog } from '../services/LogService'
import { ReportErrors } from '../models/interfaces/ReportErrors'
import '../styles/editReport.css'

const EditReport = () => {
	const navigate = useNavigate()
	const { reportid } = useParams<{ reportid: string }>()
	const [report, setReport] = useState({
		price: 0,
		status: Status.new,
	})
	const [currentReport, setCurrentReport] = useState<any>(null)
	const [errors, setErrors] = useState<ReportErrors>({})

	useEffect(() => {
		const fetchReport = async () => {
			try {
				if (reportid) {
					const fetchedReport = await getReport(reportid)
					setCurrentReport(fetchedReport)
					setReport({
						price: fetchedReport.price || 0,
						status: fetchedReport.status || Status.new,
					})
				}
			} catch (error) {
				console.error('Error fetching report:', error)
			}
		}

		fetchReport()
	}, [reportid])

	const handleInputChange = (e: { target: { name: any; value: any } }) => {
		const { name, value } = e.target
		setReport(prevReport => ({
			...prevReport,
			[name]: value,
		}))
	}
	const validateForm = () => {
		let newErrors: ReportErrors = {}

		if (!report.price) {
			newErrors.price = 'Price is required'
		} else if (report.price < 0) {
			newErrors.price = 'Price cannot be a negative value'
		} else if (report.price > 10000) {
			newErrors.price = 'Price cannot be higher than 10,000'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleUpdateReport = async () => {
		if (validateForm()) {
			try {
				if (reportid) {
					await updateReport(reportid, report)
					console.log(currentReport.startDate.toString())
					const log = new Log(currentReport.id, report.status, report.price, new Date())
					addLog(log)
					navigate('/reports')
				}
			} catch (error) {
				console.error('Error updating report:', error)
			}
		}
	}

	return (
		<>
			<section className="editReport">
				<h3>Edit Report</h3>
				<form>
					<div className="editDetails">
						<label htmlFor="price">Price</label>
						<input type="number" id="price" name="price" value={report.price} onChange={handleInputChange} />
						{errors.price && <div className="err">{errors.price}</div>}
					</div>
					<div className="editDetails">
						<label htmlFor="status">Status</label>
						<select id="status" name="status" value={report.status} onChange={handleInputChange}>
							{Object.values(Status).map(status => (
								<option key={status} value={status}>
									{status}
								</option>
							))}
						</select>
					</div>
				</form>
				<button type="button" onClick={handleUpdateReport}>
					Save Changes
				</button>
				<button className="exit">
					<a href="/reports">X</a>
				</button>
			</section>
			<button className="logout">
				<a href="/">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path
							fill="#cd3050"
							d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
						/>
					</svg>
				</a>
			</button>
		</>
	)
}

export default EditReport

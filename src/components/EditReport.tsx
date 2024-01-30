import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getReport, updateReport } from '../services/ReportService'
import { Status } from '../models/Status'
import { Log } from '../models/Log'
import { addLog } from '../services/LogService'
import { ReportErrors } from '../models/interfaces/ReportErrors'
import '../styles/editReport.css'
import LogoutBtn from '../reusableComponents/logoutBtn'
import Header from '../reusableComponents/header'

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
					const log = new Log(currentReport.id, report.status, report.price, new Date(), false)
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
			<Header content={'Edit Report'} />
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

			<LogoutBtn />
		</>
	)
}

export default EditReport

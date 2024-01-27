import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createReport } from '../services/ReportService'
import { Priority } from '../models/Priority'
import { Report } from '../models/Report'
import { UserLocalStorage } from '../services/UserLocalStorage'
import { AddReportErrors } from '../models/interfaces/AddReportErrors'
import '../styles/addReport.css'
import { Status } from '../models/Status'

const AddReport = () => {
	const navigate = useNavigate()
	const [report, setReport] = useState({
		description: '',
		priority: Priority.normal,
	})
	const [errors, setErrors] = useState<AddReportErrors>({})

	const validateForm = () => {
		let newErrors: AddReportErrors = {}

		if (!report.description) {
			newErrors.description = 'Description is required'
		} else if (report.description.length < 50) {
			newErrors.description = 'Description must be at least 50 characters long'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleInputChange = (e: { target: { name: any; value: any } }) => {
		const { name, value } = e.target
		setReport(prevReport => ({
			...prevReport,
			[name]: value,
		}))
	}

	const handleAddReport = async () => {
		try {
			if (validateForm()) {
				const local = new UserLocalStorage()
				const userdata = local.getUserData();
				if(userdata != null ){
					const repo = new Report(report.description, report.priority, Status.new, new Date(), userdata.userId.toString())
					await createReport(repo)

				}
				navigate('/reports')
			}
		} catch (error) {
			console.error('Error updating report:', error)
		}
	}

	return (
		<section className="addReport">
			<h3>Add Report</h3>
			<form>
				<div className="addDetails">
					<label htmlFor="description">Description Of The Problem</label>
					<textarea
						id="description"
						name="description"
						value={report.description}
						onChange={handleInputChange}></textarea>
					{errors.description && <div className="err">{errors.description}</div>}
				</div>

				<div className="addDetails">
					<label htmlFor="priority">Priority</label>
					<select id="priority" name="priority" value={report.priority} onChange={handleInputChange}>
						{Object.values(Priority).map(priority => (
							<option key={priority} value={priority}>
								{priority}
							</option>
						))}
					</select>
				</div>
			</form>
			<button type="button" onClick={handleAddReport}>
				Add Report
			</button>
		</section>
	)
}

export default AddReport

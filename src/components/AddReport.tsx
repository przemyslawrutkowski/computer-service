import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createReport } from '../services/ReportService'
import { Priority } from '../models/Priority'
import { Report } from '../models/Report'
import { UserLocalStorage } from '../services/UserLocalStorage'
import { ReportErrors } from '../models/interfaces/ReportErrors'
import '../styles/addReport.css'
import { Status } from '../models/Status'

const AddReport = () => {
	const navigate = useNavigate()
	const [report, setReport] = useState({
		description: '',
		priority: Priority.normal,
	})
	const [errors, setErrors] = useState<ReportErrors>({})

	const validateForm = () => {
		let newErrors: ReportErrors = {}

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
				const userdata = local.getUserData()
				if (userdata != null) {
					const repo = new Report(
						report.description,
						report.priority,
						Status.new,
						new Date(),
						userdata.userId.toString()
					)
					await createReport(repo)
				}
				navigate('/reports')
			}
		} catch (error) {
			console.error('Error updating report:', error)
		}
	}

	return (
		<>
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

export default AddReport

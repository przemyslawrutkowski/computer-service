import React, { useState } from 'react'
import { Report } from '../models/Report'
import { Status } from '../models/Status'
import { Priority } from '../models/Priority'

type FilterProps = {
	onFilterChange: (filters: Partial<Report>) => void
}

const FilterReports: React.FC<FilterProps> = ({ onFilterChange }) => {
	const [filters, setFilters] = useState<Partial<Report>>({})

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setFilters({
			...filters,
			[event.target.name]: event.target.value,
		})
		onFilterChange({
			...filters,
			[event.target.name]: event.target.value,
		})
	}

	return (
		<div className="sorts">
			<div className="box-sort">
				<p>Status</p>
				<select name="status" onChange={handleFilterChange}>
					<option value="">All</option>
					{Object.values(Status).map(status => (
						<option key={status} value={status}>
							{status}
						</option>
					))}
				</select>
			</div>
			<div className="box-sort">
				<p>Priority</p>
				<select name="priority" onChange={handleFilterChange}>
					<option value="">All</option>
					{Object.values(Priority).map(priority => (
						<option key={priority} value={priority}>
							{priority}
						</option>
					))}
				</select>
			</div>
			<div className="box-sort">
				<p>Start Date</p>
				<input type="date" name="startDate" onChange={handleFilterChange} />
			</div>
			<div className="box-sort">
				<p>End Date</p>
				<input type="date" name="endDate" onChange={handleFilterChange} />
			</div>
		</div>
	)
}

export default FilterReports

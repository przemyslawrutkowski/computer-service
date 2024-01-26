import React, { useState } from 'react';
import { Report } from '../models/Report';
import { Status } from '../models/Status';
import { Priority } from '../models/Priority';

type FilterProps = {
    onFilterChange: (filters: Partial<Report>) => void;
};

const FilterReports: React.FC<FilterProps> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState<Partial<Report>>({});

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value,
        });
        onFilterChange({
            ...filters,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div>
            <select name="status" onChange={handleFilterChange}>
                <option value="">All</option>
                {Object.values(Status).map(status => (
                    <option key={status} value={status}>{status}</option>
                ))}
            </select>
            <select name="priority" onChange={handleFilterChange}>
                <option value="">All</option>
                {Object.values(Priority).map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                ))}
            </select>
            <input type="date" name="startDate" onChange={handleFilterChange} />
            <input type="date" name="endDate" onChange={handleFilterChange} />
        </div>
    );
};

export default FilterReports;
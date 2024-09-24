import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchTerm, filterTasks } from '../../redux/Task/action';
import './FilterButton.scss';
import { allCompleted } from './UpdateTodo';
import { Select, Input } from 'antd';

const FilterButton = () => {
    const [searchTask, setSearchTask] = useState('');
    const dispatch = useDispatch();
    const currentFilter = useSelector((state) => state.filter);

    const handleSearchChange = (value) => {
        setSearchTask(value);
        dispatch(updateSearchTerm(value));
    };

    const handleFilterTask = (filter) => {
        dispatch(filterTasks(filter));
    };

    const handleAllComplete = async () => {
        allCompleted(dispatch);
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-2">
                <Select
                    className="select"
                    value={currentFilter}
                    onChange={handleFilterTask}
                    style={{ width: '100%' }}
                    placeholder="Select a filter"
                >
                    <Select.Option value="ALL">Default</Select.Option>
                    <Select.Option value="COMPLETED">Completed</Select.Option>
                    <Select.Option value="INCOMPLETED">To do</Select.Option>
                </Select>
            </div>
            <div className='col-md-2 justify-content-center'>
                <Input type="text"
                    name="searchTask"
                    id="searchTask"
                    placeholder="Search title" 
                    className=""
                    value={searchTask}
                    onChange={(e) => handleSearchChange(e.target.value)} />;
            </div>
            <div className="col-md-2 justify-content-center">
                <button className="btn btn-success" onClick={handleAllComplete}>
                    Mark all complete
                </button>
            </div>
        </div>
    );
};

export default FilterButton;

import React from "react";
import { useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterUsers, updateSearchTerm } from "../../redux/User/action";
import { Select, Input } from 'antd';

const FilterUser = () => {
    const [searchUser, setSearchUser] = useState('');
    const dispatch = useDispatch();
    const currentFilter = useSelector((state) => state.filter);

    const handleSearchChange = (value) => {
        setSearchUser(value);
        dispatch(updateSearchTerm(value));
    };
    const handleFilterUser = (filter) => {
        dispatch(filterUsers(filter)); 
    };

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-md-2">
                    <Select
                        className="select"
                        value={currentFilter}
                        onChange={handleFilterUser}
                        style={{ width: '100%' }}
                        placeholder="Select a filter"
                    >
                        <Select.Option value="ALL">Default</Select.Option>
                        <Select.Option value="AZ">A to Z</Select.Option>
                        <Select.Option value="ZA">Z to A</Select.Option>
                    </Select>
                </div>
                <div className='col-md-2 justify-content-center'>
                    <Input type="text"
                        name="searchUser"
                        id="searchUser"
                        placeholder="Search name"
                        className=""
                        value={searchUser}
                        onChange={(e) => handleSearchChange(e.target.value)} />;
                </div>
            </div>
        </>
    );
}

export default FilterUser;
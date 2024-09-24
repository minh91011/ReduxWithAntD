import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { DeleteUser } from './DeleteUser';
import { Table, Button } from 'antd';


// Hàm fetchUsers để gọi API
export const fetchUsers = async () => {
    try {
        const response = await axios.get('http://localhost:5000/users');
        return response.data; // Trả về dữ liệu nếu thành công
    } catch (error) {
        toast.error('Fetching data failed!');
        console.error("There was an error fetching the users!", error);
        return []; // Trả về mảng rỗng nếu lỗi
    }
};
  
const UserList = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filter);
    // const users = useSelector((state) => state.users)
    const [listUsers, setListUsers] = useState([]);
    

    // Gọi hàm fetchUsers khi component render lần đầu
    useEffect(() => {
        const loadUsers = async () => {
            const users = await fetchUsers();
            setListUsers(users);
        };
        loadUsers();
    });

    const handleDeleteUser = (id) => {
        DeleteUser(id, dispatch);
        // setListUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    }

    const filteredUser = useSelector((state) => {
        const searchItem = state.searchItem ? state.searchItem.toLowerCase() : "";
        console.log('Filter is: ',filter)

        // Lọc người dùng  
        const filteredUsers = listUsers.filter((user) => {
            const searchMatch = user.name && user.name.toLowerCase().includes(searchItem);
            return searchMatch;
        });

        // Sắp xếp danh sách người dùng theo filter  
        if (filter === "AZ") {
            return filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
        } else if (filter === "ZA") {
            return filteredUsers.sort((a, b) => b.name.localeCompare(a.name));
        } else {
            return filteredUsers; // Nếu filter là "ALL", không sắp xếp  
        }
    });

    // Cột của bảng
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, user) => (
                <Button type="primary" danger onClick={() => handleDeleteUser(user.id)}>
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div className="todo-app container">
            <div className="row justify-content-center mt-4">
                <div className="col-md-12 col-sm-8">
                    <Table
                        dataSource={filteredUser}
                        columns={columns}
                        rowKey="id"
                        pagination={{ pageSize: 5 }} // Chỉnh số lượng trang
                    />
                </div>
            </div>
        </div>
    )
}

export default UserList;

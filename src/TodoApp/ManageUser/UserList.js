import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { DeleteUser } from './DeleteUser';
import { Table, Button, Modal, Form, Input } from 'antd';
import UpdateUser from './UpdateUser';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


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
    const [listUsers, setListUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalShow, setIsModalShow] = useState(false)


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
    }
    const handleUpdateUser = (user) => {
        setSelectedUser(user); 
        setIsModalShow(true); 
    };
    const handleSave = () => {
        setIsModalShow(false);
        setSelectedUser(null);  
    }
    const handleCancel = () => {
        setIsModalShow(false);   
        setSelectedUser(null);   
    };

    const filteredUser = useSelector((state) => {
        const searchItem = state.searchItem ? state.searchItem.toLowerCase() : "";

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
            width: '200px',
            render: (text, user) => (
                <>
                    <div className='btn d-flex justify-content-center'>
                        <Button type="primary" danger onClick={() => handleDeleteUser(user.id)} className='btn btn-danger'
                            icon={<DeleteOutlined />}>
                        </Button>
                        <Button type="default" danger onClick={() => handleUpdateUser(user)} className='btn btn-warning text-secondary'
                            icon={<EditOutlined />}>
                        </Button>
                    </div>
                </>
            ),
        },
    ];

    return (
        <>
            <div className="todo-app container">
                <div className="row justify-content-center mt-4">
                    <div className="col-md-12 col-sm-8">
                        <Table
                            dataSource={filteredUser}
                            columns={columns}
                            rowKey="id"
                            pagination={{ pageSize: 5 }} 
                        />
                    </div>
                </div>
            </div>

            {/* Modal Update */}
            <UpdateUser
                visible={isModalShow}
                onCancel={handleCancel}
                onSave={handleSave}
                selectedUser={selectedUser}
                dispatch={dispatch}
            >
            </UpdateUser>
        </>
    )
}

export default UserList;

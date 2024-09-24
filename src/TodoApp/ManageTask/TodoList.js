import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import './TodoList.scss';
import { DeleteTodo } from "./DeleteTodo";
import { UpdateTodo } from "./UpdateTodo";
import { fetchUsers } from "../ManageUser/UserList";
import { Table, Select, Button } from 'antd';

// Hàm fetchTask không thay đổi
export const fetchTask = async () => {
    try {
        const response = await axios.get('http://localhost:5000/tasks');
        return response.data;
    } catch (error) {
        console.error("Error fetching data!", error);
        return [];
    }
};

const TodoList = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filter);
    const tasks = useSelector((state) => state.tasks); // Lấy danh sách nhiệm vụ từ Redux store  
    const [listAssignee, setListAssignee] = useState([]);
    const [listTodo, setListTodo] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const users = await fetchUsers();
            setListAssignee(users);
            const tasks = await fetchTask();
            setListTodo(tasks);
        };
        loadData();
    }, [filter, tasks]); // Chạy lại khi filter hoặc tasks thay đổi

    const filteredTodo = useSelector((state) => {
        const searchItem = state.searchItem ? state.searchItem.toLowerCase() : "";
        console.log('Filter is: ', filter)

        return listTodo.filter((task) => {
            const inputFilter = (
                (filter === "COMPLETED" && task.completed) ||
                (filter === "INCOMPLETED" && !task.completed) ||
                (filter === "ALL")
            );
            const searchMatch = task.title && task.title.toLowerCase().includes(searchItem);

            return inputFilter && searchMatch;
        });
    });

    const handleUpdateTask = (task, newTask) => {
        UpdateTodo(task, newTask, dispatch)
    };
    const handleDeleteTask = (id) => {
        DeleteTodo(id, dispatch)
    };

    //
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Create',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: 'Assignee',
            key: 'assignee',
            render: (text, task) => (
                <Select
                    value={task.assignee ? task.assignee : 'N/A'}
                    onChange={(value) => handleUpdateTask(task, {
                        assignee: value,
                        completed: task.completed
                    })}
                >
                    <Select.Option value='N/A'>N/A</Select.Option>
                    {listAssignee.map(user => (
                        <Select.Option key={user.id} value={user.name}>
                            {user.name}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            render: (text, task) => (
                <Select
                    value={task.completed ? 'Completed' : 'To Do'}
                    onChange={(value) => handleUpdateTask(task, {
                        assignee: task.assignee,
                        completed: value === 'Completed'
                    })}
                    style={{ color: task.completed ? 'green' : 'red' }} // Thêm style này
                >
                    <Select.Option value="To Do">To Do</Select.Option>
                    <Select.Option value="Completed">Completed</Select.Option>
                </Select>
            ),
        },
        {
            title: 'Complete',
            dataIndex: 'completeTime',
            key: 'completeTime',
            render: (text) => text ? text : 'N/A',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, task) => (
                <Button type='primary' danger onClick={() => handleDeleteTask(task.id)}>
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Table
                dataSource={filteredTodo}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />
        </div>
    )
}

export default TodoList;

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/Task/action'
import FilterButton from './FilterButton';
import TodoList from './TodoList';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchUsers } from '../ManageUser/UserList';

const AddTodo = () => {
    const dispatch = useDispatch();

    // State để quản lý thông tin task
    const [taskInfor, setTaskInfor] = useState({
        title: '',
        description: '',
        assignee: ''
    });

    const [listAssignee, setListAssignee] = useState([]); 

    useEffect(() => {  
        //lấy danh sách người dùng
        const getUsers = async () => {
            const userList = await fetchUsers(); // Gọi hàm fetchUsers để lấy danh sách người dùng
            setListAssignee(userList); // Lưu danh sách người dùng vào state
        };
        getUsers();
    }, []);

    const handleAddTask = async () => {
        if (taskInfor.title.trim() !== '' && taskInfor.assignee !== '') {
            const newTask = {
                title: taskInfor.title.trim(),
                description: taskInfor.description.trim(),
                assignee: taskInfor.assignee,
                completed: false,
                createTime: new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })
            };

            try {
                const response = await axios.post('http://localhost:5000/tasks', newTask);
                dispatch(addTask(response.data));
                console.log("Task vừa thêm:", newTask);
                setTaskInfor({ title: '', description: '', assignee: '' }); // Reset form
                toast.success('Add success!')
            } catch (error) {
                console.log("Error add task", error);
                toast.error('Add fail, try again!')
            }
        } else {
            toast.error('Full fill information!')
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-sm-8">
                    <div className="form-container p-4">
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Title"
                            value={taskInfor.title}
                            onChange={(e) => setTaskInfor({ ...taskInfor, title: e.target.value })}
                        />
                        <textarea
                            className="form-control mb-3"
                            placeholder="Description"
                            value={taskInfor.description}
                            onChange={(e) => setTaskInfor({ ...taskInfor, description: e.target.value })}
                        />
                        <select
                            className="form-select mb-3"
                            value={taskInfor.assignee}
                            onChange={(e) => setTaskInfor({ ...taskInfor, assignee: e.target.value })}
                        >
                            <option value="">Select Assignee</option>
                            {listAssignee.map(user => (
                                <option key={user.id} value={user.name}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        <button className="btn btn-primary w-100" onClick={handleAddTask}>Add Task</button>
                    </div>
                </div>
            </div>
            <FilterButton />
            <TodoList/>
        </div>
    )
}

export default AddTodo;

// src/redux/action.js
import axios from 'axios';
import { removeTask } from '../../redux/Task/action';
import { toast } from 'react-toastify';

export const DeleteTodo = async (id, dispatch) => {
    try {
        await axios.delete(`http://localhost:5000/tasks/${id}`);
        dispatch(removeTask(id))
        toast.success('Delete success!')
    } catch (error) {
        console.error("Error deleting task:", error);
        toast.error('Delete failed, try again!')
    }
};

// other action creators...

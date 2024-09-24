// src/redux/action.js
import axios from 'axios';
import { removeUser } from '../../redux/User/action';
import { toast } from 'react-toastify';

export const DeleteUser = async (id, dispatch) => {
    try {
        await axios.delete(`http://localhost:5000/users/${id}`);
        dispatch(removeUser(id))
        toast.success('Delete success!')
    } catch (error) {
        console.error("Error deleting user:", error);
        toast.error('Delete failed, try again!')
    }
};

// other action creators...

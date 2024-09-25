import React from "react";
import axios from "axios";
import { markCompleted, markInCompleted, markAllCompleted } from "../../redux/Task/action";
import { toast } from 'react-toastify';

export const UpdateTodo = async (task, updatedData, dispatch) => {
    try {
        const completeTime = updatedData.completed ? new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }) : null;
        const newTask ={
            assignee: updatedData.assignee,
            completed: updatedData.completed,
            completeTime: completeTime
        }

        await axios.patch(`http://localhost:5000/tasks/${task.id}`, newTask)
        if(newTask.completed === true){         
            dispatch(markCompleted(task.id, completeTime))
        }else{
            dispatch(markInCompleted(task.id))
        }
        toast.success('Update success!')
    }
    catch(error){
        console.log(error)
        toast.error('Update error, try again!')
    }
}


export const allCompleted = async(dispatch) => {
    const completeTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });
    try{
        const response = await axios.get(`http://localhost:5000/tasks/`)
        const listTask = response.data

        const updateTask = listTask.map(task => ({
            ...task,
            completed: true,
            completeTime: completeTime
        }));

        await Promise.all(updateTask.map(task => 
            axios.put(`http://localhost:5000/tasks/${task.id}`, task)
        ))
        dispatch(markAllCompleted());
        toast.success('Update success!');
    }
    catch(error){
        console.log(error)
        toast.error('Update failed!')
    }
}

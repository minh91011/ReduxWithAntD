import React from "react"; 
import axios from "axios";
import { BASE_URL } from "../ManageExam/Exams";
import { toast } from "react-toastify";

export const DeleteAnswer = async (id) => {
    try{
        await axios.delete(`${BASE_URL}/Answer/Delete/${id}`);
        toast.success('Delete success!');
    }
    catch(error){
        toast.error('Delete error!')
        console.log(error)
    }
}

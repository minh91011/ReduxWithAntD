import React from "react";
import AddExam from "./AddExam";
import axios from "axios";
import { BASE_URL } from "./Exams";
import { toast } from "react-toastify";

export const DeleteExam = async (id) => {
    try{
        await axios.delete(`${BASE_URL}/Exam/Delete/${id}`);
        toast.success('Delete success!');
    }
    catch(error){
        toast.error('Delete error!')
        console.log(error)
    }
}

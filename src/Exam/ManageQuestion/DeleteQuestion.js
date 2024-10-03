import axios from "axios";
import React from "react";
import { BASE_URL } from "../ManageExam/Exams";
import { toast } from "react-toastify";

export const DeleteQuestion = async(id) => {
    try{
        await axios.delete(`${BASE_URL}/Question/Delete/${id}`);
        toast.success('Delete success!');
    }
    catch(error){
        console.log(error);
        toast.error('Delete answers of this question before!');
    }
}

export const DeleteExamQuestion = async(id) => {
    try{
        await axios.delete(`${BASE_URL}/ExamQuestion/Delete/${id}`);
        toast.success('Delete success!');
    }
    catch(error){
        console.log(error);
        toast.error('Delete answers of this question before!');
    }
}
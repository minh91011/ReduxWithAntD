import React from "react";
import axios from "axios";
import { BASE_URL } from "./Exams";
import { toast } from "react-toastify";

export const fetchQuestionByExam = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/ExamQuestion/examId/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
}; 

export const addQuestionExam = async (newExamQuestion) => {
    try {
        const response = await axios.post(`${BASE_URL}/ExamQuestion/Add`, newExamQuestion);
        toast.success('Add success!')
        return response.data;
    } catch (error) {
        toast.error('Add fail!')
        console.log('Error:', error);
    }
};
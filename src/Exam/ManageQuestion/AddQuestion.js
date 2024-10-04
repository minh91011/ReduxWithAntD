import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { BASE_URL } from "../ManageExam/Exams";

const AddQuestion = () => {
    const dispatch = useDispatch();
    const [questionInfo, setQuestionInfo] = useState({
        // examId: '',
        questionText: ''
    });

    const handleAddQuestion = async () => {
        if(questionInfo.questionText.trim() !== ''){
            const newQuestion = {
                questionText: questionInfo.questionText
            };
            try{
                const response = await axios.post(`${BASE_URL}/Question/Add/`, newQuestion);
                toast.success('Add success!')
                setQuestionInfo({questionText: ''})
            } 
            catch(error){
                console.log(error)
                toast.error('Add fail!')
            }
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-sm-8">
                    <div className="form-container p-4">
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Enter question"
                            value={questionInfo.questionText}
                            onChange={(e) => setQuestionInfo({ ...questionInfo, questionText: e.target.value })}
                        />            
                        <button className="btn btn-primary w-100" onClick={handleAddQuestion}>Add Question</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddQuestion;  
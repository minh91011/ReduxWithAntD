import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { BASE_URL } from "./Exams";

const AddExam = () => {
    const dispatch = useDispatch();
    const [examInfo, setExamInfo] = useState({
        examName: '',
        duration: ''
    });

    const handleAddExam = async () => {
        if(examInfo.examName.trim() !== ''||examInfo.duration.trim() !== ''){
            const newExam = {
                examName: examInfo.examName,
                duration: examInfo.duration
            };
            try{
                await axios.post(`${BASE_URL}/Exam/Add/`, newExam);
                toast.success('Add success!')
                setExamInfo({examName: '', duration: ''})
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
                            placeholder="Name"
                            value={examInfo.examName}
                            onChange={(e) => setExamInfo({ ...examInfo, examName: e.target.value })}
                        />
                        <input
                            type="number"
                            className="form-control mb-3"
                            placeholder="Duration"
                            value={examInfo.duration}
                            onChange={(e) => setExamInfo({ ...examInfo, duration: e.target.value })}
                        />            
                        <button className="btn btn-primary w-100" onClick={handleAddExam}>Add Exam</button>
                    </div>
                </div>
            </div>
            {/* <FilterButton />
            <TodoList /> */}
        </div>
    )
}

export default AddExam;  
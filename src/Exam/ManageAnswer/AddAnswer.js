import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchQuestion } from "../ManageQuestion/Questions";
import { Select } from "antd";
import { BASE_URL } from "../ManageExam/Exams";

const AddAnswer = () => {
    const dispatch = useDispatch();
    const [answerInfo, setAnswerInfo] = useState({
        questionId: '',
        value: '',
        isCorrect: ''
    });
    const [listQuestionName, setListQuestionName] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const questions = await fetchQuestion();
                setListQuestionName(questions);
                console.log('Question: ', listQuestionName)
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchQuestions();
    }, []); 

    const handleAddAnswer = async () => {
        if (answerInfo.questionId !== '' && answerInfo.value.trim() !== '' &&
            answerInfo.isCorrect !== null && answerInfo.isCorrect.trim() !== '') {
            const newAnswer = {
                questionId: answerInfo.questionId,
                value: answerInfo.value,
                isCorrect: answerInfo.isCorrect === 'true'
            };
            try {
                await axios.post(`${BASE_URL}/Answer/Add/`, newAnswer);
                toast.success('Add success!');
                setAnswerInfo({ questionId: '', value: '', isCorrect: '' });
            } catch (error) {
                console.log(error);
                toast.error('Add fail!');
                console.log('Answer: ', newAnswer)
            }
        } else {
            toast.error('Fill full information!')
            setAnswerInfo({ questionId: '', value: '', isCorrect: '' });
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-sm-8">
                    <div className="form-container p-4">
                        <Select
                            onChange={(value) => setAnswerInfo({ ...answerInfo, questionId: value })}
                            value={answerInfo.questionId}
                            className="w-100 mb-3">
                            <Select.Option value="">Select question</Select.Option>
                            {listQuestionName.map(question => (
                                <Select.Option key={question.questionId} value={question.questionId}>
                                    {question.questionText}
                                </Select.Option>
                            ))}
                        </Select>
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Enter answer"
                            value={answerInfo.value}
                            onChange={(e) => setAnswerInfo({ ...answerInfo, value: e.target.value })}
                        />
                        <Select
                            onChange={(value) => setAnswerInfo({ ...answerInfo, isCorrect: value })}
                            value={answerInfo.isCorrect}
                            className="w-25 mb-3"
                        >
                            <Select.Option value="">Status</Select.Option>
                            <Select.Option value="true">Correct</Select.Option>
                            <Select.Option value="false">InCorrect</Select.Option>
                        </Select>
                        <button className="btn btn-primary w-100" onClick={handleAddAnswer}>Add Answer</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAnswer;
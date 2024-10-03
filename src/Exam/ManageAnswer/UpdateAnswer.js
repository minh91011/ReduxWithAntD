import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../ManageExam/Exams';
import { fetchQuestion } from '../ManageQuestion/Questions';

const UpdateAnswer = ({ visible, onCancel, onSave, selectedAnswer, dispatch }) => {
    const [form] = Form.useForm();
    const [questions, setQuestions] = useState([])
    // const [isCorrectValue, setIsCorrectValue] = useState(null)

    useEffect(() => {
        if (selectedAnswer) {
            form.setFieldsValue({
                questionId: selectedAnswer.questionId,
                value: selectedAnswer.value,
                isCorrect: selectedAnswer.isCorrect ? 'true' : 'false',
            });
        } else {
            form.resetFields();
        }
    }, [selectedAnswer, form]);

    useEffect(() => {
        const loadData = async () => {
            const fetchedQuestions = await fetchQuestion();
            setQuestions(fetchedQuestions)
        }
        loadData();
    }, [selectedAnswer])

    const handleSave = () => {
        form
            .validateFields()
            .then(async (values) => {
                if (values.isCorrect === null) {
                    toast.error('Select status!')
                }
                try {
                    const apiUrl = `${BASE_URL}/Answer/Update/${selectedAnswer.answerId}`;

                    const updatedAnswer = {
                        questionId: values.questionId,
                        value: values.value,
                        isCorrect: values.isCorrect === "true",
                    };


                    const response = await axios.put(apiUrl, updatedAnswer);
                    toast.success("Update success!");

                    onSave(response.data);

                } catch (error) {
                    toast.error("Update fail!");
                    console.log("Error:", error);
                }
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };


    return (
        <Modal
            visible={visible}
            title="Update Answer"
            onCancel={onCancel}
            onOk={handleSave}
            width={700}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="questionId"
                    label="Question"
                    rules={[{ required: true, message: 'Please select the Question!' }]}
                >
                    <Select>
                        {questions.map((question) => (
                            <Select.Option key={question.questionId} value={question.questionId}>
                                {question.questionText}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="value"
                    label="Answer"
                    rules={[{ required: true, message: 'Please input the Answer!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="isCorrect"
                    label="Status"
                    rules={[{ required: true, message: 'Please select the Status!' }]}
                >
                    <Select>
                        <Select.Option value="true">Correct</Select.Option>
                        <Select.Option value="false">Incorrect</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateAnswer;

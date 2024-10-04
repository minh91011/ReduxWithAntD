import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../ManageExam/Exams'; 

const UpdateQuestion = ({ title, visible, onCancel, onSave, selectedUpdateQuestion, dispatch }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (selectedUpdateQuestion) {
            form.setFieldsValue({
                questionText: selectedUpdateQuestion.questionText,
            });
        } else {
            form.resetFields();
        }
    }, [selectedUpdateQuestion, form]);

    const handleSave = () => {
        form
            .validateFields()
            .then(async (values) => {
                try {
                    const apiUrl = `${BASE_URL}/Question/Update/${selectedUpdateQuestion.questionId}`;
                    
                    const updatedQuestion = {
                        // ...selectedQuestion,
                        questionId: selectedUpdateQuestion.questionId, 
                        questionText: values.questionText,
                    };
                    
                    console.log('question: ',updatedQuestion);
                    const response = await axios.put(apiUrl, updatedQuestion);
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
            title={title}
            onCancel={onCancel}
            onOk={handleSave}
            width={700}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="questionText"
                    label="Question"
                    rules={[{ required: true, message: 'Please input the Question!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateQuestion;

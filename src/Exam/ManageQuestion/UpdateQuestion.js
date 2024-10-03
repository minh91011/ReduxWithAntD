import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../ManageExam/Exams'; 

const UpdateQuestion = ({ visible, onCancel, onSave, selectedQuestion, dispatch }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (selectedQuestion) {
            form.setFieldsValue({
                questionText: selectedQuestion.questionText,
            });
        } else {
            form.resetFields();
        }
    }, [selectedQuestion, form]);

    const handleSave = () => {
        form
            .validateFields()
            .then(async (values) => {
                try {
                    const apiUrl = `${BASE_URL}/Question/Update/${selectedQuestion.questionId}`;
                    
                    const updatedQuestion = {
                        ...selectedQuestion, 
                        questionText: values.questionText,
                    };
    
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
            title="Update Question"
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

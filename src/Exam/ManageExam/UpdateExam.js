import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from './Exams'; 

const UpdateExam = ({ visible, onCancel, onSave, selectedExam, dispatch }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (selectedExam) {
            form.setFieldsValue({
                examName: selectedExam.examName,
                duration: selectedExam.duration,
            });
        } else {
            form.resetFields();
        }
    }, [selectedExam, form]);

    const handleSave = () => {
        form
            .validateFields()
            .then(async (values) => {
                try {
                    const apiUrl = `${BASE_URL}/Exam/Update/${selectedExam.examId}`;
                    
                    const updatedExam = {
                        ...selectedExam, 
                        examName: values.examName,
                        duration: values.duration,
                    };
    
                    const response = await axios.put(apiUrl, updatedExam);
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
            title="Update Exam"
            onCancel={onCancel}
            onOk={handleSave}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="examName"
                    label="Exam name"
                    rules={[{ required: true, message: 'Please input the exam name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="duration"
                    label="Duration"
                    rules={[{ required: true, message: 'Please input duration!' }]}
                >
                    <Input type="number" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateExam;

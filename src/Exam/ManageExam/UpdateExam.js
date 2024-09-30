import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';

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

    // const handleSave = () => {
    //     form
    //         .validateFields()
    //         .then(async values => { 
    //             try {
    //                 const response = await axios.patch(`http://localhost:5000/exams/${selectedExam.id}`, values);
    //                 toast.success('Update success!');

    //                 // Gọi onSave và truyền dữ liệu để component cha có thể xử lý cần thiết  
    //                 onSave(response.data);

    //                 // Dispatch action với phản hồi người dùng cập nhật  
    //                 dispatch(updateSearchTerm(response.data));
    //             } catch (error) {
    //                 toast.error('Update fail!');
    //                 console.log('Error:', error);
    //             }
    //         })
    //         .catch(info => {
    //             console.log('Validate Failed:', info);
    //         });
    // };

    return (
        <Modal
            visible={visible}
            title="Update Exam"
            onCancel={onCancel}
        // onOk={handleSave}
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

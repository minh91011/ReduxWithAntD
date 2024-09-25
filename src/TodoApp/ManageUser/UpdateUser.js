import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import { updateSearchTerm } from '../../redux/User/action';

const UpdateUser = ({ visible, onCancel, onSave, selectedUser, dispatch }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (selectedUser) {
            form.setFieldsValue({
                name: selectedUser.name,
                email: selectedUser.email,
                phone: selectedUser.phone,
            });
        } else {
            form.resetFields(); // Reset form khi selectedUser là null
        }
    }, [selectedUser, form]);

    const handleSave = () => {
        form
            .validateFields()
            .then(async values => { 
                try {
                    const response = await axios.patch(`http://localhost:5000/users/${selectedUser.id}`, values);
                    toast.success('Update success!');

                    // Gọi onSave và truyền dữ liệu để component cha có thể xử lý cần thiết  
                    onSave(response.data);

                    // Dispatch action với phản hồi người dùng cập nhật  
                    dispatch(updateSearchTerm(response.data));
                } catch (error) {
                    toast.error('Update fail!');
                    console.log('Error:', error);
                }
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            visible={visible}
            title="Update User"
            onCancel={onCancel}
            onOk={handleSave}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input the user name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: 'Please input the email!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[{ required: true, message: 'Please input the phone number!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateUser;

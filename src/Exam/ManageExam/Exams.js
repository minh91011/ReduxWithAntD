import React, { useEffect, useState } from "react";
import AddExam from "./AddExam";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Table, Select, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';


export const fetchExam = async () => {
    try {
        const response = await axios.get(`https://localhost:8080/api/Exam`);
        return response.data
    }
    catch (error) {
        console.log('error', error)
    }
}
const ExamList = () => {
    const dispatch = useDispatch();
    const [listExam, setListExam] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const exams = await fetchExam();
            setListExam(exams)
            console.log('Exam: ', exams)
        }
        loadData();
    },[])

    //
    const columns = [
        {
            title: 'ID',
            dataIndex: 'examId',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'examName',
            key: 'title',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            width: '200px',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, task) => (
                <Button 
                    type='primary' 
                    danger 
                    // onClick={() => handleDeleteTask(task.id)} 
                    className="btn btn-danger"
                    icon={<DeleteOutlined />} // Thêm biểu tượng thùng rác
                >
                </Button>
            ), 
        },
    ];

    return (
        <div>
            <Table
                dataSource={listExam}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />
        </div>
    )
}

export default ExamList;
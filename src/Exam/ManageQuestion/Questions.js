import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Table, Select, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


export const fetchQuestion = async () => {
    try {
        const response = await axios.get(`https://localhost:8080/api/Question`);
        return response.data
    }
    catch (error) {
        console.log('error', error)
    }
}
const QuestionList = () => {
    const dispatch = useDispatch();
    const [listQuestion, setListQuestion] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const questions = await fetchQuestion();
            setListQuestion(questions)
            console.log('Question: ', questions)
        }
        loadData();
    }, [])

    //
    const columns = [
        {
            title: 'ID',
            dataIndex: 'questionId',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'questionText',
            key: 'questionText',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, task) => (
                <>
                    <Button
                        type='primary'
                        danger
                        // onClick={() => handleDeleteTask(task.id)} 
                        className="btn btn-danger"
                        icon={<DeleteOutlined />} // Thêm biểu tượng thùng rác
                    >
                    </Button>
                    <Button type="default" danger
                        // onClick={() => handleUpdateUser(user)}
                        className='btn btn-warning text-secondary'
                        icon={<EditOutlined />}>
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <Table
                dataSource={listQuestion}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />
        </div>
    )
}

export default QuestionList;
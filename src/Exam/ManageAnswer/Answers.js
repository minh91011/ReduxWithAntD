import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Table, Select, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AddAnswer from "./AddAnswer";


export const fetchAnswer = async () => {
    try {
        const response = await axios.get(`https://localhost:8080/api/Answer`);
        return response.data
    }
    catch (error) {
        console.log('error', error)
    }
}
const AnswerList = () => {
    const dispatch = useDispatch();
    const [listAnswer, setListAnswer] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const answers = await fetchAnswer();
            setListAnswer(answers)
        }
        loadData();
    }, [listAnswer])

    //
    const columns = [
        {
            title: 'ID',
            dataIndex: 'answerId',
            key: 'id',
        },
        {
            title: 'QuestionId',
            dataIndex: 'questionId',
            key: 'questionId',
        },
        {
            title: 'Answer',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'Correct',
            dataIndex: 'isCorrect',
            key: 'isCorrect',
            render: (isCorrect) => (
                <Select defaultValue={isCorrect ? 'Correct' : 'InCorrect'}>
                    <Select.Option value="Correct">Correct</Select.Option>
                    <Select.Option value="Incorrect">Incorrect</Select.Option>
                </Select>
            ),
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
            <>
                <AddAnswer />
                <Table
                    dataSource={listAnswer}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                />
            </>
        </div>
    )
}

export default AnswerList;
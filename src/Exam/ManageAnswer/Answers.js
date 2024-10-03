import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Table, Select, Button, Input } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AddAnswer from "./AddAnswer";
import { BASE_URL } from "../ManageExam/Exams";
import { DeleteAnswer } from "./DeleteAnswer";
import UpdateAnswer from "./UpdateAnswer";


export const fetchAnswer = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/Answer`);
        return response.data
    }
    catch (error) {
        console.log('error', error)
    }
}
const AnswerList = () => {
    const dispatch = useDispatch();
    const [listAnswer, setListAnswer] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isModalAnswer, setIsModalAnswer] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            const answers = await fetchAnswer();
            setListAnswer(answers)
        }
        loadData();
    }, [listAnswer])

    const handleUpdateAnswer = (answer) => {
        setIsModalAnswer(true);
        setSelectedAnswer(answer);
    }
    const handleCancelUpdateAnswer = () => {
        setIsModalAnswer(false);
        setSelectedAnswer(null);
    }
    const handleSaveUpdateAnswer = () => {
        setIsModalAnswer(false);
        setSelectedAnswer(null);
    }

    const handleDeleteAnswer = (id) => {
        console.log('id: ', id)
        DeleteAnswer(id)
    }

    //
    const columns = [
        {
            title: 'ID',
            dataIndex: 'answerId',
            key: 'id',
            width: '100px',
        },
        {
            title: 'QuestionId',
            dataIndex: 'questionId',
            key: 'questionId',
            width: '200px',
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
            width: '200px',
            render: (isCorrect) => (
                <Input value={isCorrect ? 'Correct' : 'Incorrect'} disabled className="text-dark"/>
            ),
        },                
        {
            title: 'Action',
            key: 'action',
            width: '200px',
            render: (text, answer) => (
                <>
                    <Button
                        type='primary'
                        danger
                        onClick={() => handleDeleteAnswer(answer.answerId)}
                        className="btn btn-danger"
                        icon={<DeleteOutlined />} // Thêm biểu tượng thùng rác
                    >
                    </Button>
                    <Button type="default" danger
                        onClick={() => handleUpdateAnswer(answer)}
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

                <UpdateAnswer
                    visible={isModalAnswer}
                    onCancel={handleCancelUpdateAnswer}
                    onSave={handleSaveUpdateAnswer}
                    selectedAnswer={selectedAnswer}>
                </UpdateAnswer>
            </>
        </div>
    )
}

export default AnswerList;
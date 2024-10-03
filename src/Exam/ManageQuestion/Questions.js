import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Table, Select, Button, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import AddQuestion from "./AddQuestion";
import { BASE_URL } from "../ManageExam/Exams";
import { DeleteQuestion } from "./DeleteQuestion";
import UpdateQuestion from "./UpdateQuestion";


export const fetchQuestion = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/Question`);
        return response.data
    }
    catch (error) {
        console.log('error', error)
    }
}
export const fetchAnswer = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/Answer/GetByQuestionId/id?id=${id}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching answers:', error);
    }
};
const QuestionList = () => {
    const dispatch = useDispatch();
    const [listQuestion, setListQuestion] = useState([]);
    const [listAnswerQuestion, setListAnswerQuestion] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const [isModalShow, setIsModalShow] = useState(false);
    const [currentQuestionId, setCurrentQuestionId] = useState(null);

    const [isModalQuestion, setIsModalQuestion] = useState(false);



    useEffect(() => {
        const loadData = async () => {
            const questions = await fetchQuestion();
            console.log('question: ',questions)
            setListQuestion(questions)
        }
        loadData();
    }, [listQuestion])

    useEffect(() => {
        const loadAnswer = async () => {
            if (currentQuestionId != null) {
                const fetchedAnswers = await fetchAnswer(currentQuestionId);
                setListAnswerQuestion(fetchedAnswers)
            }
        }
        loadAnswer();
    }, [isModalShow])

    const handleShowAnswer = (id) => {
        setCurrentQuestionId(id);
        setIsModalShow(true);
    };
    const handleCloseModal = () => {
        setIsModalShow(false);
        setListAnswerQuestion([]);
        setCurrentQuestionId(null);
    };

    const handleDeleteQuestion = (id) => {
        DeleteQuestion(id);
    }
    const handleUpdateQuestion = (question) => {
        setIsModalQuestion(true);
        setSelectedQuestion(question)
    }
    const handleCancelUpdateQuestion = () => {
        setIsModalQuestion(false);   
        setSelectedQuestion(null);   
    };
    const handleSaveUpdateQuestion = () => {
        setIsModalQuestion(false);   
        setSelectedQuestion(null);   
    };
    //
    const columns = [
        {
            title: 'ID',
            dataIndex: 'questionId',
            key: 'id',
        },
        {
            title: 'Question',
            dataIndex: 'questionText',
            key: 'questionText',
        },
        {
            title: 'Action',
            key: 'action',
            width: '200px',
            render: (text, question) => (
                <>
                    <Button
                        type='primary'
                        danger
                        onClick={() => handleDeleteQuestion(question.questionId)}
                        className="btn btn-danger"
                        icon={<DeleteOutlined />} // Thêm biểu tượng thùng rác
                    >
                    </Button>
                    <Button type="default" danger
                        onClick={() => handleUpdateQuestion(question)}
                        className='btn text-secondary'
                        icon={<EditOutlined />}>
                    </Button>
                    <Button type="default" danger onClick={() => handleShowAnswer(question.questionId)} className='btn text-dark' icon={<UnorderedListOutlined />}>
                        Answers
                    </Button>
                </>
            ),
        },
    ];

    const columnAnswers = [
        {
            title: 'Answer ID',
            dataIndex: 'answerId',
            key: 'answerId',
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
            width: '100px',
            render: (text, question) => (
                <>
                    <Button type='primary' danger className="btn btn-danger" icon={<DeleteOutlined />} />
                    <Button type="default" danger className='btn text-secondary' icon={<EditOutlined />} />
                </>
            ),
        },
    ];

    return (
        <>
            <AddQuestion />
            <div>
                <Table
                    dataSource={listQuestion}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                />
            </div>
            <Modal title='Answer' visible={isModalShow} onCancel={handleCloseModal} onOk={handleCloseModal} width={1000}>
                <div>
                    {listAnswerQuestion.length > 0 ? (
                        <Table
                            dataSource={listAnswerQuestion}
                            columns={columnAnswers}
                            rowKey="answerId"
                            pagination={false}
                        />
                    ) : (
                        <p>No questions available.</p>
                    )}
                </div>
            </Modal>

            <UpdateQuestion
                visible={isModalQuestion}
                onCancel={handleCancelUpdateQuestion}
                onSave={handleSaveUpdateQuestion}
                selectedQuestion={selectedQuestion}
                dispatch={dispatch}>
            </UpdateQuestion>
        </>
    )
}

export default QuestionList;
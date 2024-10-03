import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Table, Select, Button, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import AddQuestion from "./AddQuestion";
import { BASE_URL } from "../ManageExam/Exams";
import { DeleteQuestion } from "./DeleteQuestion";
import UpdateQuestion from "./UpdateQuestion";
import ModalShowAnswer from "../ManageAnswer/ModalShowAnswer";


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

    const [isModalShowAnswer, setisModalShowAnswer] = useState(false);
    const [currentQuestionId, setCurrentQuestionId] = useState(null);

    const [isModalUpdateQuestion, setisModalUpdateQuestion] = useState(false);



    useEffect(() => {
        const loadData = async () => {
            const questions = await fetchQuestion();
            console.log('question: ', questions)
            setListQuestion(questions)
        }
        loadData();
    }, [])

    useEffect(() => {
        const loadAnswer = async () => {
            if (currentQuestionId != null) {
                const fetchedAnswers = await fetchAnswer(currentQuestionId);
                setListAnswerQuestion(fetchedAnswers)
            }
        }
        loadAnswer();
    }, [isModalShowAnswer])

    const handleShowAnswer = (id) => {
        setCurrentQuestionId(id);
        setisModalShowAnswer(true);
    };
    const handleCloseModal = () => {
        setisModalShowAnswer(false);
        setListAnswerQuestion([]);
        setCurrentQuestionId(null);
    };

    const handleDeleteQuestion = (id) => {
        DeleteQuestion(id);
    }
    const handleUpdateQuestion = (question) => {
        setisModalUpdateQuestion(true);
        setSelectedQuestion(question)
    }
    const handleCancelUpdateQuestion = () => {
        setisModalUpdateQuestion(false);
        setSelectedQuestion(null);
    };
    const handleSaveUpdateQuestion = () => {
        setisModalUpdateQuestion(false);
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
            <ModalShowAnswer
                title={`Question: ${currentQuestionId}`}
                visible={isModalShowAnswer}
                onCancel={handleCloseModal}
                onSave={handleCloseModal}
                listAnswerEachQuestion={listAnswerQuestion}>
            </ModalShowAnswer>

            <UpdateQuestion
                visible={isModalUpdateQuestion}
                onCancel={handleCancelUpdateQuestion}
                onSave={handleSaveUpdateQuestion}
                selectedQuestion={selectedQuestion}
                dispatch={dispatch}>
            </UpdateQuestion>
        </>
    )
}

export default QuestionList;
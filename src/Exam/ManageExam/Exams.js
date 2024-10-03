import React, { useEffect, useState } from "react";
import AddExam from "./AddExam";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Table, Button, Modal, Select } from 'antd';
import { DeleteOutlined, EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { toast } from "react-toastify";
import UpdateExam from "./UpdateExam";
import { DeleteExam } from "./DeleteExam";
import { fetchAnswer } from "../ManageQuestion/Questions";
import { DeleteExamQuestion, DeleteQuestion } from "../ManageQuestion/DeleteQuestion";
import { DeleteAnswer } from "../ManageAnswer/DeleteAnswer";
import ModalShowAnswer from "../ManageAnswer/ModalShowAnswer";

export const BASE_URL = 'https://examonline.azurewebsites.net/api';

export const fetchExam = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/Exam`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
};

export const fetchQuestionByExam = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/ExamQuestion/examId/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
};

const ExamList = () => {
    const dispatch = useDispatch();
    const [listExam, setListExam] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null);
    const [listExamQuestion, setlistExamQuestion] = useState([]);

    //Modal cho ViewQuestion
    const [listQuestion, setlistQuestion] = useState([]);
    const [isModalShow, setIsModalShow] = useState(false);
    const [currentExamId, setCurrentExamId] = useState(null);
    //Modal cho ViewAnswer
    const [listAnswers, setListAnswers] = useState([]);
    const [isModalAnswer, setIsModalAnswer] = useState(false);
    const [currentQuestionId, setCurrentQuestionId] = useState(null);

    //Modal cho UpdateExam
    const [isModalExam, setIsModalExam] = useState(false);

    //định nghĩa để show title Modal
    const [examName, setExamName] = useState('');
    const [examId, setExamId] = useState('');

    useEffect(() => {
        const loadData = async () => {
            const exams = await fetchExam();
            setListExam(exams);
        };
        loadData();
    }, [listExam]);

    useEffect(() => {
        const loadQuestions = async () => {
            if (currentExamId !== null) {
                const fetchedQuestions = await fetchQuestionByExam(currentExamId);
                if (fetchedQuestions) {
                    const questions = fetchedQuestions.map(q => q.question);
                    setlistQuestion(questions);
                    setlistExamQuestion(fetchedQuestions)
                } else {
                    setlistQuestion([]);
                    toast.error('No questions found for this exam!');
                }
            }
        };
        loadQuestions();
    }, [isModalShow, listQuestion]);

    //Exam
    const handleUpdateExam = (exam) => {
        setSelectedExam(exam);
        setIsModalExam(true);
    }
    const handleCancelUpdateExam = () => {
        setIsModalExam(false);
        setSelectedExam(null);
    };
    const handleSaveUpdateExam = () => {
        setIsModalExam(false);
        setSelectedExam(null);
    };
    const handleDeleteExam = (id) => {
        console.log('id: ', id)
        DeleteExam(id);
    }

    //question
    const handleShowQuestion = (id, name) => {
        setCurrentExamId(id);
        setExamId(id);
        setExamName(name)
        setIsModalShow(true);
    };
    const handleCloseModal = () => {
        setIsModalShow(false);
        setlistQuestion([]);
        setCurrentExamId(null);
    };
    const handleDeleteQuestion = (examQuestionId) => {
        DeleteExamQuestion(examQuestionId);
        // console.log('id: ',examQuestionId);
    }

    //answer
    const handleShowAnswers = async (questionId) => {
        setCurrentQuestionId(questionId);
        // console.log('Qid: ',questionId)
        const fetchedAnswers = await fetchAnswer(questionId);
        if (fetchedAnswers) {
            setListAnswers(fetchedAnswers);
        } else {
            setListAnswers([]);
            toast.error('No answers found for this question!');
        }
        setIsModalAnswer(true);
        setIsModalShow(false);
    };
    const handleCloseAnswersModal = () => {
        setIsModalAnswer(false);
        setIsModalShow(true);
        setListAnswers([]);
        setCurrentQuestionId(null);
    };
    const handleDeleteAnswer = (id) => {
        DeleteAnswer(id);
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'examId',
            key: 'id',
        },
        {
            title: 'Exam name',
            dataIndex: 'examName',
            key: 'title',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            width: '200px',
            render: (text) => `${text} minutes`
        },
        {
            title: 'Action',
            key: 'action',
            width: '250px',
            render: (text, exam) => (
                <>
                    <Button type='primary' danger onClick={() => handleDeleteExam(exam.examId)} className="btn btn-danger" icon={<DeleteOutlined />} />
                    <Button type="default" danger onClick={() => handleUpdateExam(exam)} className='btn text-secondary'
                        icon={<EditOutlined />}>
                    </Button>
                    <Button type="default" danger onClick={() => handleShowQuestion(exam.examId, exam.examName)} className='btn text-dark' icon={<UnorderedListOutlined />}>
                        Questions
                    </Button>
                </>
            ),
        },
    ];

    const columnQuestions = [
        {
            title: 'Question ID',
            dataIndex: 'questionId',
            key: 'questionId',
            width: '150px',
        },
        {
            title: 'Question Text',
            dataIndex: 'questionText',
            key: 'questionText',
        },
        {
            title: 'Action',
            key: 'action',
            width: '210px',
            render: (text, question, index) => {
                const examQuestion = listExamQuestion[index]; // Tìm kiếm examQuestion tương ứng từ listExamQuestion
                return (
                    <>
                        <Button
                            type='primary'
                            danger
                            onClick={() => handleDeleteQuestion(examQuestion.examQuestionId)} // Truyền examQuestionId
                            className="btn btn-danger"
                            icon={<DeleteOutlined />} // Thêm biểu tượng thùng rác
                        />
                        <Button type="default" danger className='btn text-secondary' icon={<EditOutlined />} />
                        <Button type="default" danger onClick={() => handleShowAnswers(question.questionId)} className='btn text-dark' icon={<UnorderedListOutlined />}>
                            Answers
                        </Button>
                    </>
                );
            },
        },
    ];

    return (
        <div>
            <AddExam />
            <Table
                dataSource={listExam}
                columns={columns}
                rowKey="examId"
                pagination={{ pageSize: 5 }}
            />
            <Modal title={`Exam ${examId}: ${examName}`} visible={isModalShow}
                onCancel={handleCloseModal}
                onOk={handleCloseModal}
                width={1000}>
                <div>
                    {listQuestion.length > 0 ? (
                        <Table
                            dataSource={listQuestion}
                            columns={columnQuestions}
                            rowKey="questionId"
                            pagination={{ pageSize: 6 }}
                        />
                    ) : (
                        <p>No questions available.</p>
                    )}
                </div>
            </Modal>

            <UpdateExam
                visible={isModalExam}
                onCancel={handleCancelUpdateExam}
                onSave={handleSaveUpdateExam}
                selectedExam={selectedExam}
                dispatch={dispatch}>
            </UpdateExam>

            <ModalShowAnswer
                title={`Question: ${currentQuestionId}`}
                visible={isModalAnswer}
                onCancel={handleCloseAnswersModal}
                onSave={handleCloseAnswersModal}
                listAnswerEachQuestion={listAnswers}>
            </ModalShowAnswer>
        </div>
    );
};

export default ExamList;
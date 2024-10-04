import React, { useEffect, useState } from "react";
import AddExam from "./AddExam";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Table, Button, Modal, Select } from 'antd';
import { DeleteOutlined, EditOutlined, UnorderedListOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { toast } from "react-toastify";
import UpdateExam from "./UpdateExam";
import { DeleteExam } from "./DeleteExam";
import { fetchAnswer, fetchQuestion } from "../ManageQuestion/Questions";
import { DeleteExamQuestion, DeleteQuestion } from "../ManageQuestion/DeleteQuestion";
import ModalShowAnswer from "../ManageAnswer/ModalShowAnswer";
import UpdateQuestion from "../ManageQuestion/UpdateQuestion";
import { addQuestionExam, fetchQuestionByExam } from "./ExamQuestion";

export const BASE_URL = 'https://examonline.azurewebsites.net/api';

export const fetchExam = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/Exam`);
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
    const [listQuestionEachExam, setlistQuestionEachExam] = useState([]);
    const [isModalShow, setIsModalShow] = useState(false);
    const [currentExamId, setCurrentExamId] = useState(null);
    const [currentQuestionId, setCurrentQuestionId] = useState(null);
    const [isModalUpdateQuestion, setisModalUpdateQuestion] = useState(false);
    const [selectedUpdateQuestion, setselectedUpdateQuestion] = useState(null);
    const [allQuestions, setAllQuestions] = useState([]);
    const [selectedAddQuestion, setselectedAddQuestion] = useState({
        examId: '',
        questionId: ''
    });

    //Modal cho ViewAnswer
    const [listAnswers, setListAnswers] = useState([]);
    const [isModalAnswer, setIsModalAnswer] = useState(false);

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
                    setlistQuestionEachExam(questions);
                    setlistExamQuestion(fetchedQuestions)
                } else {
                    setlistQuestionEachExam([]);
                    toast.error('No questions found for this exam!');
                }
            }
        };
        const loadAllQuestion = async () => {
            const questions = await fetchQuestion();
            setAllQuestions(questions);
        }
        loadQuestions();
        loadAllQuestion();
    }, [isModalShow, listQuestionEachExam]);

    useEffect(() => {
        const loadAnswers = async () => {
            if (currentQuestionId !== null) {
                const fetchedAnswers = await fetchAnswer(currentQuestionId);
                if (fetchedAnswers) {
                    setListAnswers(fetchedAnswers);
                } else {
                    setListAnswers([]);
                }
            }
        };

        loadAnswers();
    }, [isModalAnswer, listAnswers]); // Chạy lại khi currentQuestionId thay đổi

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
        DeleteExam(id);
    }

    //question
    const handleShowQuestion = (id, name) => {
        setCurrentExamId(id);
        setExamId(id);
        setExamName(name);
        setselectedAddQuestion({ examId: id, questionId: '' });
        setIsModalShow(true);
    };
    const handleCloseModal = () => {
        setIsModalShow(false);
        setlistQuestionEachExam([]);
        setCurrentExamId(null);
    };
    const handleDeleteQuestion = (examQuestionId) => {
        DeleteExamQuestion(examQuestionId);
    }
    //UpdateQuestion
    const handleUpdateQuestion = (question, id) => {
        setCurrentQuestionId(id);
        setisModalUpdateQuestion(true);
        setselectedUpdateQuestion(question)
        setIsModalShow(false);
    }
    const handleCancelUpdateQuestion = () => {
        setisModalUpdateQuestion(false);
        setselectedUpdateQuestion(null);
        setIsModalShow(true);
    };
    const handleSaveUpdateQuestion = () => {
        setisModalUpdateQuestion(false);
        setselectedUpdateQuestion(null);
        setIsModalShow(true);
    };
    //addExamQuestion
    const handleAddQuestionExam = async () => {
        const newExamQuestion = {
            examId: selectedAddQuestion.examId,
            questionId: selectedAddQuestion.questionId
        };
        console.log('newExam: ', newExamQuestion); 
        await addQuestionExam(newExamQuestion);
    };

    //answer
    const handleShowAnswers = (questionId) => {
        setCurrentQuestionId(questionId);
        setIsModalAnswer(true);
        setIsModalShow(false);
    };
    const handleCloseAnswersModal = () => {
        setIsModalAnswer(false);
        setIsModalShow(true);
        setListAnswers([]);
        setCurrentQuestionId(null);
    };

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
                const examQuestion = listExamQuestion[index];
                return (
                    <>
                        <Button
                            type='primary'
                            danger
                            onClick={() => handleDeleteQuestion(examQuestion.examQuestionId)} // Truyền examQuestionId
                            className="btn btn-danger"
                            icon={<DeleteOutlined />} // Thêm biểu tượng thùng rác
                        />
                        <Button type="default" danger onClick={() => handleUpdateQuestion(question, question.questionId)} className='btn text-secondary' icon={<EditOutlined />} />
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
                    {listQuestionEachExam.length > 0 ? (
                        <Table
                            dataSource={listQuestionEachExam}
                            columns={columnQuestions}
                            rowKey="questionId"
                            pagination={{ pageSize: 6 }}
                        />
                    ) : (
                        <p>No questions available.</p>
                    )}
                    <div className="d-flex justify-content-start">
                        <Select className="w-75" defaultValue=""
                            onChange={(value) => setselectedAddQuestion({ ...selectedAddQuestion, questionId: value })}
                            value={selectedAddQuestion.questionId}>
                            <Select.Option value="" disabled>
                                Add question
                            </Select.Option>
                            {allQuestions.map(question => (
                                <Select.Option key={question.questionId} value={question.questionId}>
                                    {question.questionText}
                                </Select.Option>
                            ))}
                        </Select>
                        <Button type="success" danger className='btn btn-primary' onClick={() => handleAddQuestionExam(examId)} icon={<PlusCircleOutlined />} />
                    </div>
                </div>
            </Modal>

            <UpdateExam
                visible={isModalExam}
                onCancel={handleCancelUpdateExam}
                onSave={handleSaveUpdateExam}
                selectedExam={selectedExam}
                dispatch={dispatch}>
            </UpdateExam>

            <UpdateQuestion
                title={`Update question: ${currentQuestionId}`}
                visible={isModalUpdateQuestion}
                onCancel={handleCancelUpdateQuestion}
                onSave={handleSaveUpdateQuestion}
                selectedUpdateQuestion={selectedUpdateQuestion}>
            </UpdateQuestion>

            <ModalShowAnswer
                title={`Answer of question: ${currentQuestionId}`}
                visible={isModalAnswer}
                onCancel={handleCloseAnswersModal}
                onSave={handleCloseAnswersModal}
                listAnswerEachQuestion={listAnswers}>
            </ModalShowAnswer>
        </div>
    );
};

export default ExamList;
import React, { useEffect, useState } from "react";
import AddExam from "./AddExam";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Table, Button, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { toast } from "react-toastify";
import UpdateExam from "./UpdateExam";
import { DeleteExam } from "./DeleteExam";
 
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
    const [listExamQuestion, setListExamQuestion] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null);

    //Modal cho ViewQuestion
    const [isModalShow, setIsModalShow] = useState(false);
    //Modal cho UpdateExam
    const [isModalExam, setIsModalExam] = useState(false);

    const [currentExamId, setCurrentExamId] = useState(null);


    //định nghĩa để show Modal
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
                    setListExamQuestion(questions);
                } else {
                    setListExamQuestion([]);
                    toast.error('No questions found for this exam!');
                }
            }
        };
        loadQuestions();
    }, [isModalShow]);

    //question
    const handleShowQuestion = (id, name) => {
        setCurrentExamId(id);
        setExamId(id);
        setExamName(name)
        setIsModalShow(true);
    };
    const handleCloseModal = () => {
        setIsModalShow(false);
        setListExamQuestion([]);
        setCurrentExamId(null);
    };

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
        console.log('id: ',id)
        DeleteExam(id);
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
        },
        {
            title: 'Question Text',
            dataIndex: 'questionText',
            key: 'questionText',
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
        <div>
            <AddExam />
            <Table
                dataSource={listExam}
                columns={columns}
                rowKey="examId"
                pagination={{ pageSize: 5 }}
            />
            <Modal title={`Exam ${examId}: ${examName}`} visible={isModalShow} onCancel={handleCloseModal} onOk={handleCloseModal} width={1000}>
                <div>
                    {listExamQuestion.length > 0 ? (
                        <Table
                            dataSource={listExamQuestion}
                            columns={columnQuestions}
                            rowKey="questionId"
                            pagination={false}
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
        </div>
    );
};

export default ExamList;
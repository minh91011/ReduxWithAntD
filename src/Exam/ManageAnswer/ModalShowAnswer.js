import React from 'react';  
import { Modal, Table, Select, Button, Input} from 'antd'; 
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'; 
import { DeleteAnswer } from './DeleteAnswer';

const ModalShowAnswer = ({ title, visible, onCancel, listAnswerEachQuestion }) => {  
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
            width: '200px',
            render: (isCorrect) => (
                <Input value={isCorrect ? 'Correct' : 'Incorrect'} disabled className="text-dark"/>
            ),
        },  
        {  
            title: 'Action',  
            key: 'action',  
            render: (text, answer) => (  
                <>  
                    <Button type='primary' danger onClick={() => handleDeleteAnswer(answer.answerId)} icon={<DeleteOutlined />} />  
                    <Button type="default" danger onClick={() => handleUpdateAnswer(answer)} icon={<EditOutlined />} />  
                </>  
            ),  
        },  
    ]; 
     
    const handleUpdateAnswer = (answer) => {
        // DeleteAnswer(answer);
        console.log('answer: ',answer)
    }
    const handleDeleteAnswer = (id) => {
        DeleteAnswer(id);
        console.log('id: ',id)
    }

    return (  
        <Modal title={title} visible={visible} onCancel={onCancel} onOk={onCancel} width={1000}>  
            <div>  
                {Array.isArray(listAnswerEachQuestion) && listAnswerEachQuestion.length > 0 ? (  
                    <Table  
                        dataSource={listAnswerEachQuestion}  
                        columns={columnAnswers}  
                        rowKey="answerId"  
                        pagination={false}  
                    />  
                ) : (  
                    <p>No answers available.</p>  
                )}  
            </div>  
        </Modal>  
    );  
};  

export default ModalShowAnswer;
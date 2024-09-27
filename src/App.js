import './App.css';
import 'antd/dist/antd'
import WebLayout from './Layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashBoard from './Layout/DashBoard/DashBoard';
import TodoView from './TodoApp/ManageTask/TodoView'
import UserView from './TodoApp/ManageUser/UserView'
import { Provider } from 'react-redux';
import store from './redux/Task/store';
import ExamList from './Exam/ManageExam/Exams';
import AnswerList from './Exam/ManageAnswer/Answers';
import QuestionList from './Exam/ManageQuestion/Questions';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WebLayout />}>
            <Route index element={<DashBoard />} />
            <Route path="/TodoApp/tasks" element={<TodoView />} />
            <Route path="/TodoApp/users" element={<UserView />} />
            <Route path="/Exam/exams" element={<ExamList />} />
            <Route path="/Exam/answers" element={<AnswerList/>} />
            <Route path="/Exam/questions" element={<QuestionList/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

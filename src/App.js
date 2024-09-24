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
import { ToastContainer, Bounce } from 'react-toastify';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WebLayout />}>
            <Route index element={<DashBoard />} />
            <Route path="tasks" element={<TodoView />} />
            <Route path="users" element={<UserView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

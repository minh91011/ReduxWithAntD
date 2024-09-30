import React, { useState } from 'react';
import {
    AppstoreOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoVietED from '../Assets/Image/logoVietED.png'
import './Layout.scss'

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [

    getItem('Todo App', 'sub1', <AppstoreOutlined />, [  
        getItem(  
            <Link to="/TodoApp/Tasks" className='link-hover'>Manage Task</Link>, '1'  
        ),  
        getItem(  
            <Link to="/TodoApp/Users" className='link-hover'>Manage User</Link>, '2'  
        )  
    ]),  
    getItem('Exam System', '5', <AppstoreOutlined />, [  
        getItem(  
            <Link to="/Exam/Exams" className='link-hover'>Manage Exam</Link>, '3'  
        ),  
        getItem(  
            <Link to="/Exam/Questions" className='link-hover'>Manage Question</Link>, '4'  
        ),  
        getItem(  
            <Link to="/Exam/Answers" className='link-hover'>Manage Answer</Link>, '5'  
        )  
    ]),
];
const WebLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const location = useLocation();
    const uri = location.pathname.split('/').filter((i)=>i)
    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/" className='link'>Home</Link>
        </Breadcrumb.Item>,
        ...uri.map((snippet, index) => {
            const url = `/${uri.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url} className='link'>{snippet}</Link>
                </Breadcrumb.Item>
            );
        }),
    ];

    return (
        <Layout className='layoutParent'
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className='logoHome'><Link to="/"><img src={logoVietED} alt="Home Icon" className='logoVietED' /></Link></div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <ToastContainer
                        position="top-center"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        transition={Bounce}
                    />
            <Layout className='layoutChild'>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <Breadcrumb className='breadCrumb'>
                        {breadcrumbItems}
                    </Breadcrumb>
                    <div className="fixed-content">
                        <Outlet />
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                </Footer>
            </Layout>
        </Layout>
    );
};
export default WebLayout;
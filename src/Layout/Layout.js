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
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem';

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
            <Link to="/Tasks" className='text-decoration-none'>Manage Task</Link>, '3'
        ),
        getItem(
            <Link to="/Users" className='text-decoration-none'>Manage User</Link>, '4'
        )
    ]),
    getItem('Exam System', '5', <AppstoreOutlined />),
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
                {/* <Header className='header'>
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
                    <h3 className='headerText'>XIN CHÀO!, MÌNH LÀ NHẬT MINH, INTERN REACTJS TẠI
                        <a href="https://vieted.com/" class="headerVietED"> VIETED</a>
                    </h3>
                </Header> */}
                <Content>
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
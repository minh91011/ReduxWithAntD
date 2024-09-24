import React from "react";
import {
    MailOutlined,
    PhoneOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import './DashBoard.scss';
import { Footer } from "antd/es/layout/layout";


const DashBoard = () => {
    return (
        <>
            <div className="dashBoard">
                <div className="row">
                    <div className="col-md-4 aboutme" style={{ textAlign: 'left' }}>
                        <h3>Giới thiệu</h3>
                        <p>
                            Xin chào! Mình là Nhật Minh, một thực tập sinh ReactJS tại <a href="https://vieted.com/" class="headerVietED"> VIETED</a>.
                            Mình rất thích công việc hiện tại, mong muốn tương lai có thể gắn bó với Công Ty thật lâu.
                        </p>

                        <p>
                            Mình có một vài dự án nho nhỏ đã học được ở đây, mời mọi người theo dõi nhé!.
                        </p><br />

                        {/* <h1><ArrowLeftOutlined /></h1> */}

                        <h3>Thông Tin Liên Hệ</h3>
                        <p>
                            <MailOutlined /> Email: minhnn011002@gmail.com
                        </p>
                        <p>
                            <PhoneOutlined /> Điện thoại: 0327146217
                        </p>
                        <div>
                            Facebook:
                            <a href="https:facebook.com/minhbeo0110" class="text"> Nguyen Nhat Minh</a>
                        </div>
                    </div>
                    <div className="col-md-8 image">
                        <img className="dashboard-image" src="https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?cs=srgb&dl=pexels-jjagtenberg-103123.jpg&fm=jpg"></img>
                    </div>
                </div>
            </div>
            <Footer className="footer text-center">
                <p>

                </p>
            </Footer>
        </>
    )
}

export default DashBoard
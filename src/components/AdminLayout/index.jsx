
import {
    MenuFoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined, MenuUnfoldOutlined, DownOutlined, TeamOutlined, ExceptionOutlined, DollarCircleOutlined
} from '@ant-design/icons';
import { Button, Dropdown, Layout, Menu, Space, message, theme } from 'antd';
import { useState } from 'react';
const { Header, Sider, Content } = Layout;
import { Link, Outlet, useNavigate } from "react-router-dom";

import classNames from "classnames/bind";
import styles from './AdminLayout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { callLogOut } from '../../service/api';
import { logOutAction } from '../../redux/account/accountSlice';
const cx = classNames.bind(styles)

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false)

    const user = useSelector(state => state.account.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const items = [
        {
            label: <label style={{ cursor: 'pointer' }}>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },

    ];
    const itemMenu = [
        {
            key: 'Dashboard',
            icon: <UserOutlined />,
            label: <Link to="/admin">Dashboard</Link>,
        },
        {
            label: <span>Manage Users</span>,
            icon: <UserOutlined />,
            children: [
                {
                    label: <Link to="/admin/user">CURD</Link>,
                    key: 'CURD',
                    icon: <TeamOutlined />
                },
                {
                    label: 'Files1',
                    key: 'file1',
                    icon: <TeamOutlined />,
                }
            ]
        },
        {
            label: <Link to='/admin/book'>Manage Books</Link>,
            key: 'book',
            icon: <ExceptionOutlined />
        },
        {
            label: <Link to='/admin/order'>Manage Orders</Link>,
            key: 'order',
            icon: <DollarCircleOutlined />
        },
        {
            label: <Link to='/'>Back to Home</Link>,
            key: 'Home Page',
            icon: <DollarCircleOutlined />
        },
    ]

    const handleLogout = async () => {
        const res = await callLogOut();

        if (res && res.data) {
            dispatch(logOutAction())
            message.success("Đăng Xuất Thành Công!")
            navigate("/")
        }
    }
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh' }}
            className={cx("layout-admin")}>
            <Sider
                collapsible
                collapsed={collapsed}
                theme='light'
            >
                <div className={cx("logo")} style={{ height: 32, margin: 16, textAlign: 'center' }}>
                    Admin
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={itemMenu}
                />
            </Sider>
            <Layout>
                <div className={cx("admin-header")}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className={cx("header-account")}>

                        <Dropdown
                            menu={{
                                items,
                            }}
                            trigger={['click']}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <p className={cx("header-account__title")}>
                                        Welcome {user?.fullName}
                                    </p>

                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </div>


                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminLayout;
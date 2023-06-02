import { FaReact } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import { CgShoppingCart } from 'react-icons/cg'
import classNames from 'classnames/bind'
import styles from './header.module.scss'
import { Badge, Dropdown, Space, message } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logOutAction } from '../../redux/account/accountSlice'
import { callLogOut } from '../../service/api'
import { useEffect } from 'react'
const cx = classNames.bind(styles)

const Header = () => {

    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    const user = useSelector(state => state.account.user)
    const userRole = user.role
    const navigate = useNavigate()
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
    if (userRole === 'ADMIN') {
        console.log("🚀 ~ file: index.jsx:36 ~ Header ~ userRole:", userRole)
        items.push(
            {
                type: 'divider',
            },
            {
                label: <Link to="/admin" style={{ cursor: 'pointer' }}>Admin Dashboard</Link>,
                key: 'dashboard',
            })
    }


    const handleLogout = async () => {
        const res = await callLogOut();

        if (res && res.data) {
            dispatch(logOutAction())
            message.success("Đăng Xuất Thành Công!")
            navigate("/")
        }
    }
    return (
        <header className={cx('page-header')}>
            <div className={cx('page-header__top')}>
                <div className={cx('page-header__toggle')}></div>
                <div className={cx('header__logo')}>
                    <span className={cx('logo')}>
                        <FaReact
                            className={cx('rotate', 'icon-react')}
                        />
                        <p>React</p>
                    </span>
                </div>
                <div className={cx('header__search')}>
                    <input
                        className={cx('search-input')}
                        type="text"
                        placeholder="Bạn tìm gì hôm nay?"
                    />
                    <div className="seraparate"></div>
                    <button className={cx('search-btn')}>
                        <BiSearch />
                    </button>
                </div>
            </div>
            <div className={cx('page-header__bottom')}>
                <div className={cx("header-cart")}>
                    <Badge count={5} size={'small'}>
                        <CgShoppingCart className={cx('icon-cart')} />
                    </Badge>
                </div>
                <div className={cx("header-account")}>
                    {!isAuthenticated ?
                        (
                            <span onClick={() => navigate("/login")}>
                                Login
                            </span>
                        )
                        :
                        (<span><Dropdown
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
                        </Dropdown></span>)
                    }</div>

            </div>
        </header>
    )
}

export default Header

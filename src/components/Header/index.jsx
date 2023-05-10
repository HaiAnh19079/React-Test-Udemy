import { FaReact } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import { CgShoppingCart } from 'react-icons/cg'
import classNames from 'classnames/bind'
import styles from './header.module.scss'
import { Badge, Space } from 'antd'
const cx = classNames.bind(styles)

const Header = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
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
                        <p>Quản lý tài khoản</p>
                    </div>
                </header>
            </div>
        </div>
    )
}

export default Header

import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import Header from '../Header'
import styles from  './DefaultLayout.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const DefaultLayout = () => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                {/* <div className={cx('content')}> */}
                    <Outlet />
                {/* </div> */}
            </div>
            <Footer />
        </div>
    )
}

export default DefaultLayout

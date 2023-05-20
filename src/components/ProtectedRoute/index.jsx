import { useSelector } from 'react-redux'
import NotPermission from '../NotPermission'
import { Navigate } from 'react-router-dom'

const RoleBaseAuth = ({ children }) => {

    const isAdminRoute = window.location.pathname.startsWith('/admin')
    const user = useSelector(state => state.account.user)
    const userRole = user.role
    if (isAdminRoute && userRole === 'ADMIN') {
        return (<>{children}</>)
    } else {
        return <NotPermission />
    }
}

const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)

    return (
        <>
            {isAuthenticated === true ?
                <>
                    <RoleBaseAuth  >
                        <>{props.children}</>
                    </RoleBaseAuth>
                </>
                :
                <Navigate to="/login" replace />
            }
        </>
    )
}

export default ProtectedRoute

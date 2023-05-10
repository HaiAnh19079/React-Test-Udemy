import { useSelector } from 'react-redux'
import NotPermission from '../NotPermission'

const RoleBaseAuth = props => {
    const isAdminRoute = window.location.pathname.startsWith('/admin')
    const user = useSelector(state => state.account.user)
    const userRole = user.Role

    if (isAdminRoute && userRole === 'ADMIN') {
        return props.children
    } else {
        return <NotPermission />
    }
}

const ProtectedRoute = props => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    return (
        <>
            {isAuthenticated ? (
                <RoleBaseAuth>
                    <>{props.children}</>
                </RoleBaseAuth>
            ) : (
                <Navigate to="/login" replace />
            )}
        </>
    )
}

export default ProtectedRoute

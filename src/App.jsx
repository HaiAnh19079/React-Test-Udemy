import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'

import BookPage from './pages/book'
import LoginPage from './pages/login'
import ContactPage from './pages/contact'
import RegisterPage from './pages/register'
import { callFetchAccount } from './service/api'
import { useDispatch, useSelector } from 'react-redux'
import { getAccountAction } from './redux/account/accountSlice'
import Loading from './components/Loading'
import NotFound from './components/NotFound'
import AdminPage from './pages/Admin'
import ProtectedRoute from './components/ProtectedRoute'
import DefaultLayout from './components/DefaultLayout/DefaultLayout'
import AdminLayout from './components/AdminLayout'


export default function App() {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.account.isLoading)
    const getAccount = async () => {
        if (
            window.location.pathname === '/login' ||
            window.location.pathname === '/register'
        )
            return

        const res = await callFetchAccount()

        if (res && res.data) {
            dispatch(getAccountAction(res.data))
        }
    }

    useEffect(() => {
        getAccount()
    }, [])

    const router = createBrowserRouter([
        {
            path: '/',
            element: <DefaultLayout />,
            errorElement: <NotFound />,
            children: [
                { index: true, element: <Home /> },
                {
                    path: 'contact',
                    element: <ContactPage />,
                },
                {
                    path: 'book',
                    element: <BookPage />,
                },
            ],
        },
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/register',
            element: <RegisterPage />,
            errorElement: <div>404 not found re</div>,
        },
        {
            path: '/admin',
            element: (
                <AdminLayout />
            ),
            errorElement: <NotFound />,
            children: [
                {
                    index: true,
                    element: (
                        <ProtectedRoute>
                            <AdminPage />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: 'user',
                    element:
                        <ProtectedRoute>
                            <BookPage />,
                        </ProtectedRoute>
                },
            ],
        },
    ])

    return (
        <>
            {isLoading === false ||
                window.location.pathname === '/' ||
                window.location.pathname === '/login' ||
                window.location.pathname === '/register' ? (
                <RouterProvider router={router} />
            ) : (
                <Loading />
            )}
        </>
    )
}

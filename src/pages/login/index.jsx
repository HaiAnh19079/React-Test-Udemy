import React, { useState } from 'react'
import { Button, Divider, Form, Input, message, notification } from 'antd'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { callLogin } from '../../service/api'
import { loginAction } from '../../redux/account/accountSlice'
import { useDispatch } from 'react-redux'

const LoginPage = () => {
    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 18,
        },
    }

    const [isSubmit, setIsSubmit] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onFinish = async values => {
        const { username, password } = values

        setIsSubmit(true)

        const res = await callLogin(username, password)

        setIsSubmit(false)

        if (res?.data?.user) {
            localStorage.setItem('access_token', res.data.access_token)
            dispatch(loginAction(res.data.user))
            message.success('Đăng nhập thành công!')
            navigate('/')
        } else {
            notification.error({
                message: 'Có lỗi xảy ra!',
                description:
                    res.message && Array.isArray(res.message)
                        ? res.message[0]
                        : res.message,
                duration: 3,
            })
        }
    }

    return (
        <div className="login-page">
            <div className="main">
                <div className="container">
                    <div className="wrapper">
                        <div className="heading">
                            <h1>Đăng Nhập</h1>
                            <Divider></Divider>
                        </div>

                        <Form
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                            {...layout}>
                            <Form.Item
                                label="Email"
                                name="username"
                                labelAlign="left"
                                rules={[
                                    {
                                        required: true,
                                        type: 'email',
                                        message: 'Please enter your email!',
                                    },
                                ]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                labelAlign="left"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your password!',
                                    },
                                ]}>
                                <Input.Password />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isSubmit}>
                                    Đăng Nhập
                                </Button>
                            </Form.Item>
                            <Divider>Or</Divider>
                            <p className="text">
                                Chưa có tài khoản ?
                                <span>
                                    <Link to="/register"> Đăng Ký</Link>
                                </span>
                            </p>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage

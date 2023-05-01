import React, { useState } from 'react'
import {
    Button,
    Checkbox,
    Divider,
    Form,
    Input,
    message,
    notification,
} from 'antd'

import './register.scss'
import { Link, useNavigate } from 'react-router-dom'
import { callRegister } from '../../service/api'

const RegisterPage = () => {
    const navigate = useNavigate()
    const [isSubmit, setIsSubmit] = useState(false)

    const onFinish = async values => {
        console.log('Success:', values)
        const { fullName, email, password, phone } = values
        setIsSubmit(true)
        const response = await callRegister(fullName, email, password, phone)
        setIsSubmit(false)
        if (response?.data?._id) {
            message.success('Tạo tài khoản thành công!')
            navigate('/login')
        } else {
            notification.error({
                message: 'Có lỗi xảy ra!',
                description:
                    response.message && Array.isArray(response.message)
                        ? response.message[0]
                        : response.message,
                duration: 3,
            })
        }
        setIsSubmit(false)
    }

    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 18,
        },
    }

    return (
        <div className="register-page">
            <main className="main">
                <div className="container">
                    <div className="wrapper">
                        <div className="heading">
                            <h1>Đăng kí người dùng mới</h1>
                            <Divider></Divider>
                        </div>

                        <Form
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                            {...layout}
                            // style={{ maxWidth: 600, margin: '0 auto' }}
                        >
                            <Form.Item
                                label="FullName"
                                labelAlign="left"
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your FullName!',
                                    },
                                ]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                labelAlign="left"
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        required: true,
                                        message: 'Please input your Email!',
                                    },
                                ]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                labelAlign="left"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}>
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Phone"
                                labelAlign="left"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your PhoneNumber!',
                                    },
                                ]}>
                                <Input />
                            </Form.Item>

                            {/* <Form.Item
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{ offset: 6, span: 16 }}
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item> */}

                            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isSubmit}>
                                    Đăng ký
                                </Button>
                            </Form.Item>
                            <Divider>Or</Divider>
                            <p className="text">
                                Đã có tài khoản ?
                                <span>
                                    <Link to="/login"> Đăng nhập</Link>
                                </span>
                            </p>
                        </Form>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default RegisterPage

import React from "react";

import { Button, Col, Form, Input, Row, Space } from 'antd';

export default function InputSearch({ handleSearch,setFilter }) {

    const onFinish = (values) => {
        console.log('Success:', values);
        const { fullName, email, phone } = values
        let query = '';

        if (fullName) {
            query += `&fullName=/${fullName}/i`;
        }
        if (email) {
            query += `&email=/${email}/i`;
        }
        if (phone) {
            query += `&phone=/${phone}/i`;
        }
        if (query ) {
            handleSearch(query)
        }
    };

    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
        setFilter('')
    };

    const layout = {
        labelCol: {
            span: 24,
        },
        wrapperCol: {
            span: 24,
        },
    }

    const formStyle = {
        maxWidth: 'none',
        background: '#f1eff1',
        borderRadius: '8px',
        padding: 24,
    }
    return (
        <Form
            {...layout}
            form={form}
            name="input-search"
            onFinish={onFinish}
            style={formStyle}
        >
            <Row gutter={24} justify='center' margin='none'>
                <Col span={8}>
                    <Form.Item
                        label="Name"
                        name="fullName"
                    >
                        <Input placeholder="fullName" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input placeholder="email" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Số Điện Thoại"
                        name="phone"
                    >
                        <Input placeholder="phone" />
                    </Form.Item>
                </Col>
            </Row>


            <div style={{ textAlign: 'right' }}>
                <Form.Item
                >
                    <Space size="small">
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset} >
                            Reset
                        </Button>
                    </Space>

                </Form.Item>
            </div>

        </Form>
    )
}

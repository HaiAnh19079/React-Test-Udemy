import { Badge, Descriptions, Drawer } from "antd";
import moment from "moment/moment";
import React from "react";

const UserDetail = ({ data, open, setData, setOpen }) => {
    console.log(data);
    const onClose = () => {
        setOpen(false);
        setData(null);
    }

    return (
        <>
            <Drawer
                title="View detail user information"
                placement="right"
                onClose={onClose}
                open={open}
                width={'60vw'}
            >
                <Descriptions
                    title="User Detail"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{data?._id}</Descriptions.Item>
                    <Descriptions.Item label="Tên Hiển Thị">{data?.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Email">{data?.email}</Descriptions.Item>
                    <Descriptions.Item label="Số Điện Thoại">{data?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Role" span={2}>
                        <Badge status="processing" text={data?.role} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {moment(data?.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(data?.updatedAt).format('DD-MM-YYYY HH:mm:ss')}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    )
};

export default UserDetail;

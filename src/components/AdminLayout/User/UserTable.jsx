import React, { useEffect, useState } from "react";
import { callFetchListUser } from "../../../service/api";
import { Button, Col, Row, Table } from "antd";
import {
    ReloadOutlined
} from '@ant-design/icons'
import { AiOutlineDelete } from "react-icons/ai";
import InputSearch from "./inputSearch";
import UserDetail from "./UserDetail";

export default function UserTable() {
    const initValues = {
        currentPage: 1,
        pageSize: 3,
        total: 0,
    }
    const [listUser, setListUser] = useState([])
    const [total, setTotal] = useState(initValues.total)
    const [currentPage, setCurrentPage] = useState(initValues.currentPage)
    const [pageSize, setPageSize] = useState(initValues.pageSize)
    const [isLoading, setIsLoading] = useState(false)
    const [filter, setFilter] = useState('')
    const [sortQuery, setSortQuery] = useState('')
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState();

    useEffect(() => {
        async function fetchData() {
            await fetchUser()
        }
        fetchData()
    }, [currentPage, pageSize, filter, sortQuery]);


    const fetchUser = async () => {
        setIsLoading(true)

        let query = `current=${currentPage}&pageSize=${pageSize}`

        if (filter) {
            query += filter
        }
        if (sortQuery) {
            query += sortQuery
        }

        const res = await callFetchListUser(query);

        console.log("🚀 ~ file: UserTable.jsx:24 ~ fetchUser ~ query:", query)

        if (res && res.data) {
            setTotal(res.data.meta.total)
            setListUser(res.data.result)
        }
        setIsLoading(false)
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: function (text, record, index) {
                return (
                    <a href="#" onClick={() => {
                        setDataViewDetail(record)
                        setOpenViewDetail(true)
                    }}>
                        {record._id}
                    </a>)
            }
        },
        {
            title: 'Tên Hiển Thị ',
            dataIndex: 'fullName',
            sorter: {
                compare: (a, b) => a.fullName - b.fullName,
                multiple: 1,
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: {
                compare: (a, b) => a.email - b.email,
                multiple: 2,
            },
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: {
                compare: (a, b) => a.phone - b.phone,
                multiple: 3,
            },
        },
        {
            title: 'Action',
            render: function (text, record, index) {
                return (
                    <>
                        <Button danger>
                            <AiOutlineDelete color="red" cursor="pointer" />
                        </Button>
                    </>
                )
            },
            dataIndex: 'action',
        },
    ];

    const onChange = function (pagination, filters, sorter, extra) {

        if (pagination.current !== currentPage) {
            setCurrentPage(pagination.current)
        }
        if (pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrentPage(1)
        }
        if (sorter && sorter.field) {
            let querySort = ''
            if (!sorter.order) {
                querySort = null
            }
            if (sorter.order === "ascend") {
                querySort += `&sort=${sorter.field}`
            }
            if (sorter.order === "descend") {
                querySort += `&sort=-${sorter.field}`
            }

            setSortQuery(querySort);
        }
        console.log('params', pagination, filters, sorter, extra);
    }

    const handleSearch = (query) => {
        setCurrentPage(initValues.currentPage)
        setPageSize(initValues.pageSize)
        setFilter(query)

    }

    const handleRefreshTable = async () => {
        setCurrentPage(initValues.currentPage)
        setPageSize(initValues.pageSize)
        setFilter('')
        setSortQuery('')
    }

    return (
        <>
            <Row gutter={[20, 20]} >
                <Col span={24}>
                    <InputSearch handleSearch={handleSearch} setFilter={setFilter} />
                </Col>

                <Col span={24}>
                    <div>
                        <div className="button-handle">
                            <Button type='ghost'
                                onClick={handleRefreshTable}
                            >
                                <ReloadOutlined />
                            </Button>
                        </div>

                        <Table
                            dataSource={listUser}
                            rowKey="_id"
                            columns={columns}
                            onChange={onChange}
                            loading={isLoading}
                            pagination={
                                {
                                    current: currentPage,
                                    pageSize: pageSize,
                                    showSizeChanger: true,
                                    total: total,
                                    showTotal: (total,
                                        range) => {
                                        return (<div> {range[0]}-{range[1]} trên {total}
                                            rows</div>)
                                    },
                                    pageSizeOptions: [2, 3, 5, 10, 20, 50, 100]
                                }
                            }
                        />
                    </div>
                </Col>
            </Row>
            <UserDetail
                open={openViewDetail}
                setOpen={setOpenViewDetail}
                data={dataViewDetail}
                setData={setDataViewDetail}
            />

        </>
    )
}

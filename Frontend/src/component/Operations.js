import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.min.css';

const operations = () => {
    const data = [{
        id : 1,
        name: "name 1",
        phone: '9465131234',
        address: 'address',
        '' : "",
        key : '1'
    },{
        id : 2,
        name: "name 2",
        phone: '9465131234',
        address: 'address',
        '' : "",
        key : '2'
    },{
        id : 3,
        name: "name 3",
        phone: '9465131234',
        address: 'address',
        '' : "",
        key : '3'
    },{
        id : 4,
        name: "name 4",
        phone: '9465131234',
        address: 'address',
        '' : "",
        key : '4'
    }
    ]

    const columns = [
        {
            title : 'ID',
            dataIndex: 'id',
            key : 'key'
        },{
            title : 'Name',
            dataIndex: 'name',
            key : 'key'
        },{
            title : 'Phone',
            dataIndex: 'phone',
            key : 'key'
        },{
            title : 'Address',
            dataIndex: 'address',
            key : 'key'
        },{
            title : '',
            dataIndex: '',
            key : 'key'
        },
        ]
        
  return (
    <div style={{margin: '1rem', borderRadius: '5px', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px'}}>
        <div>
        <Table style={{padding: '5px'}}
        dataSource={data} 
        columns={columns}>

        </Table>
        </div>
        
    </div>
  )
}

export default operations;
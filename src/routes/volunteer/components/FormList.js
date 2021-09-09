import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Table, Popconfirm, Popover } from 'antd';
import { noData, authority, setCacheData } from '../../../utils/util';

function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, onRemove } = props;

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '志愿者姓名',
        dataIndex: 'volunteerName',
        key: 'volunteerName',
        render: noData,
      }, {
        title: '手机号码',
        dataIndex: 'mobile',
        key: 'mobile',
        render: (text, record) => {
          return text ? text.substr(0, 3) + '****' + text.substr(text.length - 4) : '-'
        }
      }
      , {
        title: '所属中心>队伍类型>队伍归属>所属队伍',
        dataIndex: 'ascription',
        key: 'ascription',
        render: (text, record) => {
          return text && text.length > 0 ?
            text.map((item, index) => {
              return <div key={index}>{`${item}`}</div>
            })
            : '-'
        }
      }, {
        title: '志愿者标签',
        dataIndex: 'tags',
        key: 'tags',
        render: (text, record) => {
          return text && text.length > 0 ?
          text.length > 2 ? 
        <Popover content={<div style={{width: '300px'}}>{text.join("，")}</div>} >
          {/* {text.map((item, index)=>{
            if(index < 2){
              return text.slice(0, 1).join("，")
            } })}*/}
            {text.slice(0, 2).join("，")+ '...'}
          </Popover> : text.join("，")
            : '-'
        },
      }, {
        title: '活动次数',
        dataIndex: 'activityCount',
        key: 'activityCount',
        render: noData,
      }, {
        title: '文明值',
        dataIndex: 'civilizationSurplus',
        key: 'civilizationSurplus',
        render: noData,
      },{
        title: '累计文明时长',
        dataIndex: 'durationSurplus',
        key: 'durationSurplus',
        render:  (text, record) => {
             return authority('wmzs') ? <Link to={`/volunteerIndex?id=${record.id}`} onClick={() => setCacheData(params)}>{text || '-'}</Link> : text || '-'
           },
      }, {
        title: '文明积分',
        dataIndex: 'integralSurplus',
        key: 'integralSurplus',
        render: noData
        
     
      },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          let link1 = `/volunteerView?id=${record.id}&mobile=${record.mobile}`;
          return <div>
            {authority('detail') ?
              // <a className="mr1">详情</a>
              // <Link to={link1} className="mr1">详情</Link>
            <Link to={`/volunteerDetail?id=${record.id}&&disabled=${true}`} className="mr1" onClick={() => setCacheData(params)}>详情</Link>
              : null
            }
            {authority('edit') ?
              // <a className="mr1">编辑</a>
              // <Link to={link2} className="mr1">编辑</Link>
            <Link to={`/volunteerEdit?id=${record.id}&&disabled=${false}`} className="mr1" onClick={() => setCacheData(params)}>编辑</Link>

              : null
            }
            {authority('del') ?
            <Popconfirm title={`您是否要删除?`} onConfirm={() => onRemove(record)}>
              <a className="mr1">删除</a>
            </Popconfirm>: null
            }
          </div>
        }
      }],
    pagination: {
      total: paginationTotal ? Number(paginationTotal) : '',
      current: params.pageNum,
      defaultCurrent: 1,
      defaultPageSize: params.pageSize,
      showTotal: (total, range) => `共有 ${paginationTotal} 条`,
      onChange: (page, pageSize) => {
        onChangePage ? onChangePage(page) : '';
      },
    },
    rowKey: (record, index) => index,
    loading: loading
  }

  return (
    <div>
      <Table {...tableProps} />
    </div>
  )
}

export default Form.create()(FormList);

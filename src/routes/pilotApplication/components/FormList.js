import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Table, Badge } from 'antd';
import { noData, authority, setCacheData } from '../../../utils/util';

function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, isAdmin, memberType } = props;

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '区县',
        dataIndex: 'center_name',
        key: 'center_name',
        render: noData,
      }, {
        title: '所属地市',
        dataIndex: 'cityName',
        key: 'cityName',
        render: noData,
      }, {
        title: '年度',
        dataIndex: 'yearName',
        key: 'yearName',
        render: noData,
      }, {
        title: '状态',
        dataIndex: 'stateName',
        key: 'stateName',
        // render: stateName => <span><Badge status/>{stateName}</span>,
        render: (text, item) => {
          const { state } = item;
          return <p><Badge status={state == 1 || state == 2 ? "default" : state == 3 || state == 4 ? "warning" : "success"} />{text}</p>
        },
      }, {
        title: '提交日期',
        dataIndex: 'createTime',
        key: 'createTime',
        render: noData,
      },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          const { state, id } = record;
          return <div>
            {authority('detail') || isAdmin == 10 ?
              <Link to={`/pilotApplicationEdit?id=${id}&&type=3&&status=${state}&&menberType=${memberType}`} onClick={() => setCacheData(params)}>详情</Link>
              : null
            }
            {authority('examine') || isAdmin == 10 ?
              ((state == 2 && memberType == 3) || ((state == 1 || state == 4) && memberType == 2)) && <Link to={`/pilotApplicationEdit?id=${id}&&type=5&&status=${state}&&menberType=${memberType}`} className="ml1" onClick={() => setCacheData(params)}>审核</Link>
              : null
            }
            {authority('edit') || isAdmin == 10 ?
              state == 3 && memberType == 1 && <Link to={`/pilotApplicationEdit?id=${id}&&type=2&&status=${state}&&menberType=${memberType}`} className="ml1" onClick={() => setCacheData(params)}>修改</Link>
              : null
            }
            {authority('evaluate') || isAdmin == 10 ?
              state == 5 && <Link to={`/pilotApplicationEdit?id=${id}&&status=${state}&&type=4&&menberType=${memberType}`} className="ml1" onClick={() => setCacheData(params)}>评价</Link>
              : null
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

import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Calendar, Select, Radio, Col, Row, Badge } from 'antd';
import { noData, authority, setCacheData } from '../../../utils/util';
const { Group, Button } = Radio;
import "../index.less";
let fullYear =  new Date().getFullYear();

function FormList(props) {
  const { teamList, teamId, list,
    handleChange, onHeaderRender, onSelectFun, onChanges } = props;

  function onSelect(value) {
    onSelectFun ? onSelectFun(value) : '';
  }

  function onHandleChange(value) {
    handleChange ? handleChange(value) : ''
  }

  function getListData(value) {
    let listData;
    list && list.length > 0 ?
      list.map((item, index) => {
        if ((value.month() + 1) == +item.month) {
          switch (value.date()) {
            case +item.day:
              listData = item.teamArr;
              break;
            default:
          }
        }
      }) : ''
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <div className="events">
        {listData.map((item, index) => (
          <div key={index} className={`status status-${item.serverStatus}`}>
            {item.serverStatusName}：<br />{item.startDate}~{item.endDate}
          </div>
        ))}
      </div>
    );
  }

  function onPanelChange(value, mode) {
    console.log("123:", value, mode);
  }


  return (
    <div>
      <Calendar
        dateCellRender={dateCellRender}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        headerRender={
          ({ value, type, onChange, onTypeChange }) => {
            const start = 0;
            const end = 12;
            const monthOptions = [];

            const current = value.clone();
            const localeData = value.localeData();
            const months = [];
            for (let i = 0; i < 12; i++) {
              current.month(i);
              months.push(localeData.monthsShort(current));
            }

            for (let index = start; index < end; index++) {
              monthOptions.push(
                <Select.Option className="month-item" key={`${index}`}>
                  {months[index]}
                </Select.Option>,
              );
            }
            const month = value.month();
            const year = value.year();
            onHeaderRender(year, month)
            const options = [];
            for (let i = fullYear; i < fullYear + 2; i += 1) {
              options.push(
                <Select.Option key={i} value={i} className="year-item">
                  {i}
                </Select.Option>,
              );
            }
            return (
              <div style={{ padding: 10 }}>
                <Row type="flex" justify="end" gutter={10}>
                  <Col>
                    <Select
                      placeholder="请选择队伍名称"
                      style={{ width: '130px' }}
                      value={teamId}
                      onChange={onHandleChange}
                    >
                      {teamList && teamList.length > 0 ? teamList.map((item, index) =>
                        <Select.Option key={index} value={item.key}>{item.value}</Select.Option>) : ''}
                    </Select>
                  </Col>
                  <Col>
                    <Select
                      dropdownMatchSelectWidth={false}
                      className="my-year-select"
                      onChange={newYear => {
                        const now = value.clone().year(newYear);
                        onChange(now);
                        onChanges(now);
                      }}
                      value={String(year)}
                    >
                      {options}
                    </Select>
                  </Col>
                  <Col>
                    <Select
                      dropdownMatchSelectWidth={false}
                      value={String(month)}
                      onChange={selectedMonth => {
                        const newValue = value.clone();
                        newValue.month(parseInt(selectedMonth, 10));
                        onChange(newValue);
                        onChanges(newValue);
                      }}
                    >
                      {monthOptions}
                    </Select>
                  </Col>
                </Row>
              </div>
            );
          }
        } />
    </div>
  )
}

export default Form.create()(FormList);


import React from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
// import './index.css';
import { Transfer, Table, Tag, Modal } from 'antd';
import difference from 'lodash/difference';

// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter(item => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? 'none' : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

const leftTableColumns = [
  {
    dataIndex: 'title',
    title: '队伍名称',
  }
];
const rightTableColumns = [
  {
    dataIndex: 'title',
    title: '队伍名称',
  },
];

class AssociatedTeam extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const { visible, mockData, type, targetKeys, selectedKeys = [],
      handleOk, handleCancel, handleChange, handleSearch, onSelectChange, onScroll } = this.props;
    function onHandleChange(targetKeys) {
      handleChange && handleChange(targetKeys);
    }
    function handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
      let selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];
      onSelectChange ? onSelectChange(selectedKeys) : '';
    }

    return (
      <Modal
        title="关联队伍"
        visible={visible}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
        destroyOnClose={true}
        width={800}
      >
        <TableTransfer
          titles={['未关联队伍', '已关联队伍']}
          dataSource={mockData}
          targetKeys={targetKeys}
          showSearch
          onChange={onHandleChange}
          onSearch={() => handleSearch()}
          render={item => item.title}
          onSelectChange={handleSelectChange}
          // filterOption={(inputValue, item) =>
          //   item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          // }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        />
      </Modal>
    );
  }
}

export default AssociatedTeam;
          
import React from 'react';
import { Form, Tree } from 'antd';
const { TreeNode } = Tree;

class Menus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      treeData: []
    };
  }
  componentDidMount() {

  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    let { treeData, checkedKeys } = nextProps;
    // console.log("this.props2:", this.props);
    // console.log("nextProps:", nextProps);
    if(this.props.checkedKeys == checkedKeys){
    const dataList = [];
    const generateList = data => {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const { id } = node;
        // dataList.push(id);
        if (node.children) {
          generateList(node.children);
        }
      }
    };
    generateList(treeData);
    this.setState({
      treeData,
      checkedKeys,
      expandedKeys: checkedKeys
    });
    }
  }

  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
    this.props.onCheckFun(checkedKeys);
  };

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item} disabled={item.disabled}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.id} dataRef={item} disabled={item.disabled}/>;
    });

  
  render() {
    let { treeData, checkedKeys } = this.state;
    return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    );
  }
}
export default Form.create()(Menus);
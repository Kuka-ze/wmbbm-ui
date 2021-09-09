import React from 'react';
import { connect } from 'dva';
import './MainLayout.css';
import MainHeader from "./MainHeader.js";
import { Link } from 'dva/router';
import { Layout, Menu, Icon, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
const { Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;
moment.locale('zh-cn');

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: sessionStorage.current ? sessionStorage.current : '/IndexPage',
      openKeys: sessionStorage.openKeys ? JSON.parse(sessionStorage.openKeys) : ['9999'],
      username: sessionStorage.username ? sessionStorage.username : "",
    };
  }

  handleClick = (e) => {
    //console.log(111111)cache
    //console.log(1111)
    let dataCenterTimer = sessionStorage.getItem('dataCenterTimers');
    clearInterval(dataCenterTimer);
    sessionStorage.removeItem('dataCenterTimers');
    this.setState({
      current: e.key,
    });
    sessionStorage.current = e.key;
    let arr = [];
    arr.push(e.keyPath[1]);
    sessionStorage.openKeys = JSON.stringify(arr);
    //删除列表参数
    sessionStorage.removeItem('listParams');
    sessionStorage.removeItem('cacheData');
  }

  onOpenChange = (openKeys) => {
    const arr = [];
    {
      sessionStorage.getItem('menus') && JSON.parse(sessionStorage.getItem('menus')).map((value, index) => {
        arr.push(String(value.id))
      }) || []
    }
    const rootSubmenuKeys = arr && arr.length > 0 ? ["9999", ...arr, "06"] : ["9999", "01", "02", "03", "04", "05", "06"];
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  //首页获取菜单
  render() {
    let { menuList } = this.props
    menuList = menuList.length > 0 && menuList || sessionStorage.getItem('menus') && JSON.parse(sessionStorage.getItem('menus')) || []
    let isAdmin = sessionStorage.getItem('isAdmin');
    let departmentGs = sessionStorage.getItem('departmentGs');
    let mobile = sessionStorage.getItem('mobile');
    return (
      <ConfigProvider locale={zhCN}>
        <Layout>
          <MainHeader visible={this.props.visible} menuList={menuList} />
          {
            // menuList && menuList.length<0 ? 
            <Layout>
              <Sider style={{ minHeight: window.screen.availHeight - 64 }} >
                <div className="logo"></div>
                <Menu
                  theme="dark"
                  mode="inline"
                  defaultOpenKeys={this.state.openKeys}
                  openKeys={this.state.openKeys}
                  onClick={this.handleClick}
                  onOpenChange={this.onOpenChange}
                  defaultSelectedKeys={[this.state.current]}>
                  <SubMenu key="9999" title={<span><Icon type="appstore" /><span>首页</span></span>}>
                    <Menu.Item key="99991">
                      <Link to={'/IndexPage'}>工作台
                        {/* {isAdmin && isAdmin==2&&<i className="icon-free"/>} */}
                      </Link>
                    </Menu.Item>
                  </SubMenu>
                  {menuList && menuList.length > 0 && menuList.map((item, index) => {
                    return (
                      <SubMenu key={item.id} title={<span><Icon type={item.menuIcon} /><span>{item.menuName}</span></span>}>
                        {item.children && item.children.map((items, indexs) => {
                          return (
                            <Menu.Item key={items.id}>
                              <Link to={`${items.menuUrl}`}>
                                {items.menuName}
                              </Link>
                            </Menu.Item>
                          )
                        })}
                      </SubMenu>
                    )
                  })}
                  {(isAdmin && isAdmin == 9) && (mobile && mobile != 14000000000) ?
                    <SubMenu key="01" title={<span><Icon type="appstore" /><span>账号管理</span></span>}>
                      <Menu.Item key="0101">
                        <Link to={'/accountManagement'}>账号管理</Link>
                      </Menu.Item>
                    </SubMenu> : ''}
                  {(isAdmin && isAdmin == 9) || (mobile && mobile == 14000000000) ?
                    <SubMenu key="02" title={<span><Icon type="appstore" /><span>用户推送</span></span>}>
                      <Menu.Item key="0201">
                        <Link to={'/bannerManagement'}>小程序banner管理</Link>
                      </Menu.Item>
                      <Menu.Item key="0202">
                        <Link to={'/bannerManagements'}>H5banner管理</Link>
                      </Menu.Item>
                    </SubMenu> : ''
                  }
                  {isAdmin && isAdmin == 9 ?
                    <SubMenu key="03" title={<span><Icon type="appstore" /><span>标签管理</span></span>}>
                      <Menu.Item key="0301">
                        <Link to={'/labelTypeManagement'}>标签类别管理</Link>
                      </Menu.Item>
                      <Menu.Item key="0302">
                        <Link to={'/labelManagement'}>标签管理</Link>
                      </Menu.Item>
                    </SubMenu> : ''}
                  {isAdmin && isAdmin == 9 ?
                    <SubMenu key="04" title={<span><Icon type="appstore" /><span>小程序管理</span></span>}>
                      <Menu.Item key="0401">
                        <Link to={'/throughTrain'}>公益直通车</Link>
                      </Menu.Item>
                      <Menu.Item key="0402">
                        <Link to={'/cooperativeApplet'}>合作小程序</Link>
                      </Menu.Item>
                    </SubMenu> : ''}
                  {isAdmin && isAdmin == 9 ?
                    <SubMenu key="05" title={<span><Icon type="appstore" /><span>平台审核</span></span>}>
                      <Menu.Item key="0501">
                        <Link to={'/platformAudit'}>其他文明时</Link>
                      </Menu.Item>
                    </SubMenu> : ''}
                  {isAdmin && isAdmin == 10 ?
                    <SubMenu key="06" title={<span><Icon type="appstore" /><span>试点申报管理</span></span>}>
                      <Menu.Item key="0601">
                        <Link to={`/pilotApplication`}>试点申报管理</Link>
                      </Menu.Item>
                    </SubMenu> : ''
                  }
                  {departmentGs && departmentGs == 1 ?
                    <SubMenu key="07" title={<span><Icon type="appstore" /><span>阳光小伢儿</span></span>}>
                      <Menu.Item key="0701">
                        <a style={{ paddingLeft: '8px' }} target="_blank" href="https://yangguang-web.zje.com/#/learning/schoolList"><span><Icon type="appstore" style={{ opacity: '.6' }} /></span>服务管理</a>
                      </Menu.Item>
                    </SubMenu>
                    : ''
                  }
                </Menu>
              </Sider>
              <Layout>
                <Content className="content">
                  {this.props.children}
                  <footer>
                    <p> </p>
                    {/* <p>技术支持：三仟(杭州)数字科技有限公司</p> */}
                  </footer>
                </Content>
              </Layout>
            </Layout>
            // : <div className="kong-tu1">
            //   <div className="kong-tu-text">您尚未开通本系统角色，请联系管理员开通</div>
            // </div>
          }
        </Layout>
      </ConfigProvider>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.MainLayoutModel };
}
export default connect(mapStateToProps)(MainLayout);

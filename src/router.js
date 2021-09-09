import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

function RouterConfig({ history, app }) {

  const Login = dynamic({
    app,
    models: () => [
      import('./models/Login'),
    ],
    component: () => import('./components/Login/Login.js'),
  });
  /** dingLogin */
  const DingLogin = dynamic({
    app,
    models: () => [
      import('./models/dingLogin/dingLoginModal'),
    ],
    component: () => import('./routes/dingLogin/Index.js'),
  });
  const Container = dynamic({
    app,
    models: () => [
      import('./models/MainLayout'),
    ],
    component: () => import('./components/MainLayout/MainLayout.js'),
  });

  const IndexPage = dynamic({
    app,
    model: () => [
      import('./models/MainLayout'),
    ],
    component: () => import('./routes/IndexPage'),
  });

  //角色管理
  // 角色管理列表
  const roles = dynamic({
    app,
    models: () => [
      import('./models/addressManagement/rolesModel'),
    ],
    component: () => import('./routes/addressManagement/roles.js'),
  });
  // 角色管理新增/编辑页面
  const rolesAdd = dynamic({
    app,
    models: () => [
      import('./models/addressManagement/rolesAddModel'),
    ],
    component: () => import('./routes/addressManagement/rolesAdd.js'),
  });
  // 人员关联列表
  const rolespersonnel = dynamic({
    app,
    models: () => [
      import('./models/addressManagement/rolespersonnelModel'),
    ],
    component: () => import('./routes/addressManagement/rolespersonnel.js'),
  });
  // 通讯录管理
  const address = dynamic({
    app,
    models: () => [
      import('./models/addressManagement/addressModel'),
    ],
    component: () => import('./routes/addressManagement/address.js'),
  });

  /** 志愿者列表 start */
  // 志愿者列表
  const Volunteer = dynamic({
    app,
    models: () => [
      import('./models/volunteer/VolunteerModel'),
    ],
    component: () => import('./routes/volunteer/Volunteer'),
  });
  // 志愿者列表-新增、编辑
  const VolunteerAddEdit = dynamic({
    app,
    models: () => [
      import('./models/volunteer/VolunteerAddEditModel.js'),
    ],
    component: () => import('./routes/volunteer/VolunteerAddEdit'),
  });
  // 志愿者列表-查看详情
  const VolunteerView = dynamic({
    app,
    models: () => [
      import('./models/volunteer/VolunteerViewModel.js'),
    ],
    component: () => import('./routes/volunteer/VolunteerView'),
  });
  // 文明值明细
  const VolunteerIndex = dynamic({
    app,
    models: () => [
      import('./models/volunteer/VolunteerIndexModel.js'),
    ],
    component: () => import('./routes/volunteer/VolunteerIndex'),
  });
  /** 志愿者列表 end */

  //活动审批
  const ApprovalList = dynamic({
    app,
    models: () => [
      import('./models/approvalList/ApprovalListModel'),
    ],
    component: () => import('./routes/approvalList/ApprovalList'),
  });
  const ApprovalInList = dynamic({
    app,
    models: () => [
      import('./models/approvalList/ApprovalInListModel'),
    ],
    component: () => import('./routes/approvalList/ApprovalInList'),
  });
  //活动新增
  const AddActivity = dynamic({
    app,
    models: () => [
      import('./models/approvalList/AddActivityModel'),
    ],
    component: () => import('./routes/approvalList/AddActivity'),
  });
  //审批详情
  const ApprovalInfo = dynamic({
    app,
    models: () => [
      import('./models/approvalList/ApprovalInfoModel'),
    ],
    component: () => import('./routes/approvalList/ApprovalInfo'),
  });
  //参与情况明细
  const ApprovalDetail = dynamic({
    app,
    models: () => [
      import('./models/approvalList/ApprovalDetailModel'),
    ],
    component: () => import('./routes/approvalList/ApprovalDetail'),
  });

  /** 账号管理 start */
  // 账号管理
  const AccountManagement = dynamic({
    app,
    models: () => [
      import('./models/accountManagement/IndexModel'),
    ],
    component: () => import('./routes/accountManagement/Index'),
  });
  // 账号管理-新增、编辑
  const AccountManagementAddEdit = dynamic({
    app,
    models: () => [
      import('./models/accountManagement/IndexAddEditModel.js'),
    ],
    component: () => import('./routes/accountManagement/IndexAddEdit'),
  });
  /** 账号管理 end */

  /** 标签管理 start */
  // 标签类别管理
  const LabelManagement = dynamic({
    app,
    models: () => [
      import('./models/labelManagement/IndexModel')
    ],
    component: () => import('./routes/labelManagement/Index'),
  });
  // 标签管理
  const LabelTypeManagement = dynamic({
    app,
    models: () => [
      import('./models/labelTypeManagement/IndexModel.js'),
    ],
    component: () => import('./routes/labelTypeManagement/Index'),
  });
  /** 标签管理 end */

  /** 通知宣传 start */
  // 通知宣传
  const NoticePublicity = dynamic({
    app,
    models: () => [
      import('./models/noticePublicity/IndexModel.js'),
    ],
    component: () => import('./routes/noticePublicity/Index'),
  });
  // 通知宣传-新增、编辑
  const NoticePublicityAddEdit = dynamic({
    app,
    models: () => [
      import('./models/noticePublicity/IndexAddEditModel.js'),
    ],
    component: () => import('./routes/noticePublicity/IndexAddEdit'),
  });
  // 通知宣传-查看详情
  const NoticePublicityView = dynamic({
    app,
    models: () => [
      import('./models/noticePublicity/IndexViewModel.js'),
    ],
    component: () => import('./routes/noticePublicity/NoticeInfo'),
  });
  /** 通知宣传 end */

  /** 公益宣传 start */
  // 公益宣传
  const WelfarePublicity = dynamic({
    app,
    models: () => [
      import('./models/welfarePublicity/IndexModel.js'),
    ],
    component: () => import('./routes/welfarePublicity/Index'),
  });
  // 公益宣传-新增、编辑
  const WelfarePublicityAddEdit = dynamic({
    app,
    models: () => [
      import('./models/welfarePublicity/IndexAddEditModel.js'),
    ],
    component: () => import('./routes/welfarePublicity/IndexAddEdit'),
  });
  // 公益宣传-查看详情
  const WelfarePublicityView = dynamic({
    app,
    models: () => [
      import('./models/welfarePublicity/IndexViewModel.js'),
    ],
    component: () => import('./routes/welfarePublicity/WelfareInfo'),
  });
  /** 公益宣传 end */

  /** 文明秀管理 start */
  const CivilizationShow = dynamic({
    app,
    models: () => [
      import('./models/civilizationShow/IndexModel.js'),
    ],
    component: () => import('./routes/civilizationShow/Index'),
  });

  /** 文明秀管理 end */

  /** 中心管理 start */
  // 列表
  const CentralManagement = dynamic({
    app,
    models: () => [
      import('./models/centralManagement/IndexModel'),
    ],
    component: () => import('./routes/centralManagement/Index'),
  });
  // 新增、编辑
  const CentralManagementAddEdit = dynamic({
    app,
    models: () => [
      import('./models/centralManagement/IndexAddEditModel.js'),
    ],
    component: () => import('./routes/centralManagement/IndexAddEdit'),
  });
  // 详情
  const CentralManagementView = dynamic({
    app,
    models: () => [
      import('./models/centralManagement/IndexViewModel.js'),
    ],
    component: () => import('./routes/centralManagement/IndexView'),
  });
  // 管辖单位列表
  const CentralManagementDetail = dynamic({
    app,
    models: () => [
      import('./models/centralManagement/IndexDetailModel.js'),
    ],
    component: () => import('./routes/centralManagement/IndexDetail'),
  });
  /** 中心管理 end */
  /** 所管理 start */
  // 列表
  const Managed = dynamic({
    app,
    models: () => [
      import('./models/managed/IndexModel'),
    ],
    component: () => import('./routes/managed/Index'),
  });
  // 新增、编辑
  const ManagedAddEdit = dynamic({
    app,
    models: () => [
      import('./models/managed/IndexAddEditModel.js'),
    ],
    component: () => import('./routes/managed/IndexAddEdit'),
  });
  // 详情
  const ManagedView = dynamic({
    app,
    models: () => [
      import('./models/managed/IndexViewModel.js'),
    ],
    component: () => import('./routes/managed/IndexView'),
  });
  // 管辖单位列表
  const ManagedDetail = dynamic({
    app,
    models: () => [
      import('./models/managed/IndexDetailModel.js'),
    ],
    component: () => import('./routes/managed/IndexDetail'),
  });
  /** 所管理 end */
  /** 站管理 start */
  // 列表
  const StationManagement = dynamic({
    app,
    models: () => [
      import('./models/stationManagement/IndexModel'),
    ],
    component: () => import('./routes/stationManagement/Index'),
  });
  // 新增、编辑
  const StationManagementAddEdit = dynamic({
    app,
    models: () => [
      import('./models/stationManagement/IndexAddEditModel.js'),
    ],
    component: () => import('./routes/stationManagement/IndexAddEdit'),
  });
  // 详情
  const StationManagementView = dynamic({
    app,
    models: () => [
      import('./models/stationManagement/IndexViewModel.js'),
    ],
    component: () => import('./routes/stationManagement/IndexView'),
  });
  // 管辖单位列表
  const StationManagementDetail = dynamic({
    app,
    models: () => [
      import('./models/stationManagement/IndexDetailModel.js'),
    ],
    component: () => import('./routes/stationManagement/IndexDetail'),
  });
  /** 站管理 end */
  /** 点管理 start */
  // 列表
  const PointManagement = dynamic({
    app,
    models: () => [
      import('./models/pointManagement/IndexModel'),
    ],
    component: () => import('./routes/pointManagement/Index'),
  });
  // 新增、编辑
  const PointManagementAddEdit = dynamic({
    app,
    models: () => [
      import('./models/pointManagement/IndexAddEditModel.js'),
    ],
    component: () => import('./routes/pointManagement/IndexAddEdit'),
  });
  // 详情
  const PointManagementView = dynamic({
    app,
    models: () => [
      import('./models/pointManagement/IndexViewModel.js'),
    ],
    component: () => import('./routes/pointManagement/IndexView'),
  });
  // 管辖单位列表
  const PointManagementDetail = dynamic({
    app,
    models: () => [
      import('./models/pointManagement/IndexDetailModel.js'),
    ],
    component: () => import('./routes/pointManagement/IndexDetail'),
  });
  /** 点管理 end */
  /** 活动类型管理 start */
  // 列表
  const ActivityTypeManagement = dynamic({
    app,
    models: () => [
      import('./models/activityTypeManagement/IndexModel'),
    ],
    component: () => import('./routes/activityTypeManagement/Index'),
  });
  // 新增、编辑
  const ActivityTypeManagementAddEdit = dynamic({
    app,
    models: () => [
      import('./models/activityTypeManagement/IndexAddEditModel.js'),
    ],
    component: () => import('./routes/activityTypeManagement/IndexAddEdit'),
  });
  /** 活动类型管理 end */
  /** 志愿联盟管理 start */
  // 列表
  const VoluntaryAlliance = dynamic({
    app,
    models: () => [
      import('./models/voluntaryAlliance/IndexModel'),
    ],
    component: () => import('./routes/voluntaryAlliance/Index'),
  });
  // 新增、编辑
  const VoluntaryAllianceAddEdit = dynamic({
    app,
    models: () => [
      import('./models/voluntaryAlliance/IndexAddEditModel.js'),
    ],
    component: () => import('./routes/voluntaryAlliance/IndexAddEdit'),
  });
  // 详情
  const AllianceInfo = dynamic({
    app,
    models: () => [
      import('./models/voluntaryAlliance/AllianceInfoModel'),
    ],
    component: () => import('./routes/voluntaryAlliance/AllianceInfo'),
  });
  // 管辖单位列表
  const VoluntaryAllianceDetail = dynamic({
    app,
    models: () => [
      import('./models/voluntaryAlliance/IndexDetailModel.js'),
    ],
    component: () => import('./routes/voluntaryAlliance/IndexDetail'),
  });
  /** 志愿联盟管理 end */
  /** 志愿联盟管理 start */
  // 列表
  const VolunteerTeam = dynamic({
    app,
    models: () => [
      import('./models/volunteerTeam/IndexModel'),
    ],
    component: () => import('./routes/volunteerTeam/Index'),
  });
  // 新增、编辑
  const VolunteerTeamAddEdit = dynamic({
    app,
    models: () => [
      import('./models/volunteerTeam/IndexAddEditModel.js'),
    ],
    component: () => import('./routes/volunteerTeam/IndexAddEdit'),
  });

  /** 志愿联盟管理 end */
  /** 事件中心 start */
  // 列表
  const EventCenter = dynamic({
    app,
    models: () => [
      import('./models/eventCenter/IndexModel'),
    ],
    component: () => import('./routes/eventCenter/Index'),
  });
  // 列表详情
  const EventCenterInfo = dynamic({
    app,
    models: () => [
      import('./models/eventCenter/EventCenterInfoModel'),
    ],
    component: () => import('./routes/eventCenter/EventCenterInfo'),
  });
  /** 事件中心 end */

  /** 拍陋习 start */
  // 列表
  const BadHabits = dynamic({
    app,
    models: () => [
      import('./models/badHabits/IndexModel'),
    ],
    component: () => import('./routes/badHabits/Index'),
  });
  // 列表详情
  const BadHabitsInfo = dynamic({
    app,
    models: () => [
      import('./models/badHabits/BadHabitsInfoModel'),
    ],
    component: () => import('./routes/badHabits/BadHabitsInfo'),
  });
  /** 拍陋习 end */
  /** 数据中心 */
  const DataCenter = dynamic({
    app,
    models: () => [
      import('./models/dataCenter/DataCenterModel'),
    ],
    component: () => import('./routes/dataCenter/DataCenter.js'),
  });
  /** Demo */
  const Demo = dynamic({
    app,
    models: () => [
      import('./models/dataCenter/DemoModel'),
    ],
    component: () => import('./routes/dataCenter/Demo.js'),
  });
  /** 数据中心 end */
  /** banner管理 start */
  // 列表
  const BannerManagement = dynamic({
    app,
    models: () => [
      import('./models/bannerManagement/IndexModel'),
    ],
    component: () => import('./routes/bannerManagement/Index'),
  });
  // 新增、编辑
  const BannerManagementAddEdit = dynamic({
    app,
    models: () => [
      import('./models/bannerManagement/IndexAddEditModel.js'),
    ],
    component: () => import('./routes/bannerManagement/IndexAddEdit'),
  });
  /** banner管理 end */
  /** 市级管理 start */
  // 列表
  const MunicipalManagement = dynamic({
    app,
    models: () => [
      import('./models/municipalManagement/IndexModel'),
    ],
    component: () => import('./routes/municipalManagement/Index'),
  });
  // 新增、编辑、查看
  const MunicipalManagementAddEditView = dynamic({
    app,
    models: () => [
      import('./models/municipalManagement/IndexAddEditViewModel.js'),
    ],
    component: () => import('./routes/municipalManagement/IndexAddEditView'),
  });
  /** 市级管理 end */

  /** 文明共建 start */
  // 列表
  const CivilizationBuild = dynamic({
    app,
    models: () => [
      import('./models/civilizationBuild/IndexModel.js'),
    ],
    component: () => import('./routes/civilizationBuild/Index'),
  });
  // 新增、编辑、查看
  const CivilizationBuildAddEditView = dynamic({
    app,
    models: () => [
      import('./models/civilizationBuild/IndexAddEditViewModel.js'),
    ],
    component: () => import('./routes/civilizationBuild/IndexAddEditView'),
  });
  /** 文明共建 end */

  /** 文化场馆 start */
  // 列表
  const CulturalVenues = dynamic({
    app,
    models: () => [
      import('./models/culturalVenues/IndexModel.js'),
    ],
    component: () => import('./routes/culturalVenues/Index'),
  });
  // 新增、编辑、查看
  const CulturalVenuesAddEditView = dynamic({
    app,
    models: () => [
      import('./models/culturalVenues/IndexAddEditViewModel.js'),
    ],
    component: () => import('./routes/culturalVenues/IndexAddEditView'),
  });
  /** 文化场馆 end */
  /** 试点申报管理 start */
  // 试点申报管理
  const PilotApplication = dynamic({
    app,
    models: () => [
      import('./models/pilotApplication/IndexModel.js'),
    ],
    component: () => import('./routes/pilotApplication/Index'),
  });
  /** 试点申报管理 end */
  /** 公益直通车 start */
  // 列表
  const ThroughTrain = dynamic({
    app,
    models: () => [
      import('./models/throughTrain/IndexModel'),
    ],
    component: () => import('./routes/throughTrain/Index'),
  });
  // 管理列表
  const ThroughTrainManagement = dynamic({
    app,
    models: () => [
      import('./models/throughTrain/IndexManagementModel'),
    ],
    component: () => import('./routes/throughTrain/IndexManagement'),
  });
  // 新增、编辑
  const ThroughTrainAddEdit = dynamic({
    app,
    models: () => [
      import('./models/throughTrain/IndexAddEditModel.js'),
    ],
    component: () => import('./routes/throughTrain/IndexAddEdit'),
  });
  /** 公益直通车 end */
  /** 合作小程序 start */
  // 列表
  const CooperativeApplet = dynamic({
    app,
    models: () => [
      import('./models/cooperativeApplet/IndexModel'),
    ],
    component: () => import('./routes/cooperativeApplet/Index'),
  });
  // 新增、编辑
  const CooperativeAppletAddEdit = dynamic({
    app,
    models: () => [
      import('./models/cooperativeApplet/IndexAddEditModel.js'),
    ],
    component: () => import('./routes/cooperativeApplet/IndexAddEdit'),
  });
  /** 合作小程序 end */
  /** 服务类型 start */
  // 列表
  const ServiceType = dynamic({
    app,
    models: () => [
      import('./models/serviceType/IndexModel.js'),
    ],
    component: () => import('./routes/serviceType/Index'),
  });
  /** 服务类型 end */
  /** 服务排期 start */
  // 列表
  const ServiceScheduling = dynamic({
    app,
    models: () => [
      import('./models/serviceScheduling/IndexModel.js'),
    ],
    component: () => import('./routes/serviceScheduling/Index'),
  });
  /** 服务排期 end */
  /** 任务管理 start */
  // 列表
  const TaskManagement = dynamic({
    app,
    models: () => [
      import('./models/taskManagement/IndexModel.js'),
    ],
    component: () => import('./routes/taskManagement/Index'),
  });
  /** 任务管理 end */
  /** 平台审核 start */
  // 其他文明时列表
  const platformAudit = dynamic({
    app,
    models: () => [
      import('./models/platformAudit/IndexModel'),
    ],
    component: () => import('./routes/platformAudit/Index'),
  });
  // 详情/审核
  const platformDetail = dynamic({
    app,
    models: () => [
      import('./models/platformAudit/IndexAddEditModel'),
    ],
    component: () => import('./routes/platformAudit/IndexAddEdit'),
  });

  /** 平台审核 end */
  /** 驾驶舱 */
  const Cockpit = dynamic({
    app,
    models: () => [
      import('./models/cockpit/CockpitModel'),
    ],
    component: () => import('./routes/cockpit/Cockpit.js'),
  });
  /** 驾驶舱 end */
  /** 试点申报管理 start */
  // 分步填写申报内容
  const StepApplication = dynamic({
    app,
    models: () => [
      import('./models/pilotApplication/StepApplicationModel'),
    ],
    component: () => import('./routes/pilotApplication/StepApplication'),
  });
  /** 试点申报管理 end */

  // 试点申报管理详情/审核
  const pilotApplicationEdit = dynamic({
    app,
    models: () => [
      import('./models/pilotApplication/pilotApplicationEdit'),
    ],
    component: () => import('./routes/pilotApplication/pilotApplicationEdit'),
  });
  //驳回历史记录
  const rejectionRecord = dynamic({
    app,
    models: () => [
      import('./models/pilotApplication/pilotApplicationEdit'),
    ],
    component: () => import('./routes/pilotApplication/components/RejectionRecord'),
  });

  /** 大家帮-问题池 start */
  // 列表
  const VentPool = dynamic({
    app,
    models: () => [
      import('./models/ventPool/IndexModel'),
    ],
    component: () => import('./routes/ventPool/Index'),
  });
  // 列表详情
  const VentPoolInfo = dynamic({
    app,
    models: () => [
      import('./models/ventPool/VentPoolInfoModel'),
    ],
    component: () => import('./routes/ventPool/VentPoolInfo'),
  });
  /** 大家帮-问题池 end */

  /** 大家帮-公益池 start */
  // 列表
  const WelfarePool = dynamic({
    app,
    models: () => [
      import('./models/welfarePool/IndexModel'),
    ],
    component: () => import('./routes/welfarePool/Index'),
  });
  //新增
  const AddWelfarePool = dynamic({
    app,
    models: () => [
      import('./models/welfarePool/IndexAddEdit'),
    ],
    component: () => import('./routes/welfarePool/IndexAddEdit'),
  });
  // 公益详情
  const WelfarePoolInfo = dynamic({
    app,
    models: () => [
      import('./models/welfarePool/WelfarePoolInfoModel'),
    ],
    component: () => import('./routes/welfarePool/WelfarePoolInfo'),
  });
  // 列表统筹
  const OverallPlanning = dynamic({
    app,
    models: () => [
      import('./models/welfarePool/overallPlanningModel'),
    ],
    component: () => import('./routes/welfarePool/OverallPlanning'),
  });
  /** 大家帮-公益池 end */

  /** 活动池 start */
  // 列表
  const ActivityPool = dynamic({
    app,
    models: () => [
      import('./models/activityPool/IndexModel'),
    ],
    component: () => import('./routes/activityPool/Index'),
  });
  // 详情
  const ActivityPoolView = dynamic({
    app,
    models: () => [
      import('./models/activityPool/IndexViewModel.js'),
    ],
    component: () => import('./routes/activityPool/IndexView'),
  });
  /** 活动池 end */

  /** 理论宣讲-宣讲项目 start */
  // 列表
  const PublicityProject = dynamic({
    app,
    models: () => [
      import('./models/publicityProject/IndexModel'),
    ],
    component: () => import('./routes/publicityProject/Index'),
  });
  //新增
  const AddPublicity = dynamic({
    app,
    models: () => [
      import('./models/publicityProject/publicityAddEdit'),
    ],
    component: () => import('./routes/publicityProject/PublicityAddEdit'),
    // component: () => import('./routes/welfarePool/IndexAddEdit'),
  });
  // 宣讲详情
  const PublicityInfo = dynamic({
    app,
    models: () => [
      import('./models/publicityProject/WelfarePoolInfoModel'),
    ],
    component: () => import('./routes/publicityProject/WelfarePoolInfo'),
  });
  // 列表统筹
  const PublicitOverall = dynamic({
    app,
    models: () => [
      import('./models/publicityProject/overallPlanningModel'),
    ],
    component: () => import('./routes/publicityProject/OverallPlanning'),
  });
  /** 理论宣讲-宣讲项目 end */
  /** 理论宣讲-活动池 start */
  // 列表
  const ActivityPond = dynamic({
    app,
    models: () => [
      import('./models/activityPond/IndexModel'),
    ],
    component: () => import('./routes/activityPond/Index'),
  });
  // 详情
  const ActivityPondView = dynamic({
    app,
    models: () => [
      import('./models/activityPond/IndexViewModel.js'),
    ],
    component: () => import('./routes/activityPond/IndexView'),
  });
  /** 理论宣讲-活动池 end */
  /** 活动管理-志愿汇活动 start */
  //志愿汇活动列表
  const ZyhActivity = dynamic({
    app,
    models: () => [
      import('./models/approvalList/ZyhActivityModel'),
    ],
    component: () => import('./routes/approvalList/ZyhActivity/Index'),
  });

  //志愿汇活动--详情
  const ZyhActivityInfo = dynamic({
    app,
    models: () => [
      import('./models/approvalList/ZyhActivityInfoModel'),
    ],
    component: () => import('./routes/approvalList/ZyhActivity/ZyhActivityInfo'),
  });

  /** 活动管理-志愿汇活动 end */

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dingLogin" component={DingLogin} />
        {/** 数据中心 */}
        <Route path="/dataCenters" component={DataCenter} />
        <Route path="/demo" component={Demo} />
        {/** 数据中心end */}
        {/** 驾驶舱 */}
        <Route path="/dataCenter" component={Cockpit} />
        {/** 驾驶舱end */}
        <Container>
          {/* 首页 控制台 */}
          <Route path="/indexPage" component={IndexPage} />

          {/* 通讯录管理 和系统设置*/}
          <Route path="/rolesAdd" component={rolesAdd} />
          <Route path="/roles" component={roles} />
          <Route path="/rolespersonnel" component={rolespersonnel} />
          <Route path="/address" component={address} />

          {/** 志愿者列表 */}
          <Route path="/volunteer" component={Volunteer} />
          <Route path="/volunteerAdd" component={VolunteerAddEdit} />
          <Route path="/volunteerEdit" component={VolunteerAddEdit} />
          <Route path="/volunteerDetail" component={VolunteerAddEdit} />
          <Route path="/volunteerView" component={VolunteerView} />
          <Route path="/volunteerIndex" component={VolunteerIndex} />

          <Route path="/approvalList" component={ApprovalList} />
          <Route path="/addActivity" component={AddActivity} />
          <Route path="/editActivity" component={AddActivity} />
          <Route path="/detailActivity" component={AddActivity} />
          <Route path="/approvalInfo" component={ApprovalInfo} />
          <Route path="/approvalDetail" component={ApprovalDetail} />
          <Route path="/approvalInList" component={ApprovalInList} />

          {/** 账号管理 */}
          <Route path="/accountManagement" component={AccountManagement} />
          <Route path="/accountManagementAdd" component={AccountManagementAddEdit} />
          {/** 标签管理 */}
          <Route path="/labelManagement" component={LabelManagement} />
          <Route path="/labelTypeManagement" component={LabelTypeManagement} />
          {/** 通知宣传 */}
          <Route path="/noticePublicity" component={NoticePublicity} />
          <Route path="/noticePublicityAdd" component={NoticePublicityAddEdit} />
          <Route path="/noticePublicityEdit" component={NoticePublicityAddEdit} />
          <Route path="/noticePublicityView" component={NoticePublicityView} />
          {/** 文明秀管理  */}
          {/** 公益宣传 */}
          <Route path="/welfarePublicity" component={WelfarePublicity} />
          <Route path="/welfarePublicityAdd" component={WelfarePublicityAddEdit} />
          <Route path="/welfarePublicityEdit" component={WelfarePublicityAddEdit} />
          <Route path="/welfarePublicityView" component={WelfarePublicityView} />
          {/** 文明秀管理  */}
          <Route path="/civilizationShow" component={CivilizationShow} />

          {/** 中心管理 */}
          <Route path="/centralManagement" component={CentralManagement} />
          <Route path="/centralManagementAdd" component={CentralManagementAddEdit} />
          <Route path="/centralManagementEdit" component={CentralManagementAddEdit} />
          <Route path="/centralManagementView" component={CentralManagementView} />
          <Route path="/centralManagementDetail" component={CentralManagementDetail} />
          {/** 所管理 */}
          <Route path="/managed" component={Managed} />
          <Route path="/managedAdd" component={ManagedAddEdit} />
          <Route path="/managedEdit" component={ManagedAddEdit} />
          <Route path="/managedView" component={ManagedView} />
          <Route path="/managedDetail" component={ManagedDetail} />
          {/** 站管理 */}
          <Route path="/stationManagement" component={StationManagement} />
          <Route path="/stationManagementAdd" component={StationManagementAddEdit} />
          <Route path="/stationManagementEdit" component={StationManagementAddEdit} />
          <Route path="/stationManagementView" component={StationManagementView} />
          <Route path="/stationManagementDetail" component={StationManagementDetail} />
          {/** 点管理 */}
          <Route path="/pointManagement" component={PointManagement} />
          <Route path="/pointManagementAdd" component={PointManagementAddEdit} />
          <Route path="/pointManagementEdit" component={PointManagementAddEdit} />
          <Route path="/pointManagementView" component={PointManagementView} />
          <Route path="/pointManagementDetail" component={PointManagementDetail} />
          {/** 活动类型管理 */}
          <Route path="/activityTypeManagement" component={ActivityTypeManagement} />
          <Route path="/activityTypeManagementAdd" component={ActivityTypeManagementAddEdit} />
          <Route path="/activityTypeManagementEdit" component={ActivityTypeManagementAddEdit} />

          {/** 志愿联盟管理 */}
          <Route path="/voluntaryAlliance" component={VoluntaryAlliance} />
          <Route path="/voluntaryAllianceAdd" component={VoluntaryAllianceAddEdit} />
          <Route path="/voluntaryAllianceEdit" component={VoluntaryAllianceAddEdit} />
          <Route path="/allianceInfo" component={AllianceInfo} />

          {/** 志愿队伍管理 */}
          <Route path="/volunteerTeam" component={VolunteerTeam} />
          <Route path="/volunteerTeamAdd" component={VolunteerTeamAddEdit} />
          <Route path="/volunteerTeamEdit" component={VolunteerTeamAddEdit} />
          <Route path="/volunteerTeamDetail" component={VolunteerTeamAddEdit} />
          <Route path="/voluntaryAllianceDetail" component={VoluntaryAllianceDetail} />
          {/** 事件中心 */}
          <Route path="/eventCenter" component={EventCenter} />
          <Route path="/eventCenterInfo" component={EventCenterInfo} />
          {/** 拍陋习 */}
          <Route path="/badHabits" component={BadHabits} />
          <Route path="/badHabitsInfo" component={BadHabitsInfo} />
          {/** banner管理 */}
          <Route path="/bannerManagement" component={BannerManagement} />
          <Route path="/bannerManagementAdd" component={BannerManagementAddEdit} />
          <Route path="/bannerManagementEdit" component={BannerManagementAddEdit} />
          <Route path="/bannerManagements" component={BannerManagement} />
          {/** 市级管理 */}
          <Route path="/municipalManagement" component={MunicipalManagement} />
          <Route path="/municipalManagementEdit" component={MunicipalManagementAddEditView} />
          <Route path="/municipalManagementView" component={MunicipalManagementAddEditView} />
          {/** 文明共建 */}
          <Route path="/civilizationBuild" component={CivilizationBuild} />
          <Route path="/civilizationBuildAdd" component={CivilizationBuildAddEditView} />
          <Route path="/civilizationBuildEdit" component={CivilizationBuildAddEditView} />
          <Route path="/civilizationBuildView" component={CivilizationBuildAddEditView} />
          {/** 文化场馆 */}
          <Route path="/culturalVenues" component={CulturalVenues} />
          <Route path="/culturalVenuesAdd" component={CulturalVenuesAddEditView} />
          <Route path="/culturalVenuesEdit" component={CulturalVenuesAddEditView} />
          <Route path="/culturalVenuesView" component={CulturalVenuesAddEditView} />
          {/** 公益直通车 */}
          <Route path="/throughTrain" component={ThroughTrain} />
          <Route path="/throughTrainManagement" component={ThroughTrainManagement} />
          <Route path="/throughTrainAdd" component={ThroughTrainAddEdit} />
          <Route path="/throughTrainEdit" component={ThroughTrainAddEdit} />
          {/** 合作小程序 */}
          <Route path="/cooperativeApplet" component={CooperativeApplet} />
          <Route path="/cooperativeAppletAdd" component={CooperativeAppletAddEdit} />
          <Route path="/cooperativeAppletEdit" component={CooperativeAppletAddEdit} />
          {/** 服务类型 */}
          <Route path="/serviceType" component={ServiceType} />
          {/** 服务排期 */}
          <Route path="/serviceScheduling" component={ServiceScheduling} />
          {/** 任务管理 */}
          <Route path="/taskManagement" component={TaskManagement} />

          {/** 志愿队伍管理 */}
          <Route path="/platformAudit" component={platformAudit} />
          <Route path="/platformDetail" component={platformDetail} />
          {/** 分步填写申报内容 */}
          <Route path="/stepApplication" component={StepApplication} />
          {/** 试点申报管理 */}
          <Route path="/pilotApplicationEdit" component={pilotApplicationEdit} />
          <Route path="/rejectionRecord" component={rejectionRecord} />
          <Route path="/pilotApplication" component={PilotApplication} />
          {/** 大家帮-问题池 */}
          <Route path="/ventPool" component={VentPool} />
          <Route path="/ventPoolInfo" component={VentPoolInfo} />
          {/** 大家帮-公益池 */}
          <Route path="/welfarePool" component={WelfarePool} />
          <Route path="/addWelfarePool" component={AddWelfarePool} />
          <Route path="/welfarePoolInfo" component={WelfarePoolInfo} />
          <Route path="/overallPlanning" component={OverallPlanning} />
          {/** 大家帮-活动池 */}
          <Route path="/activityPool" component={ActivityPool} />
          <Route path="/activityPoolView" component={ActivityPoolView} />
          {/** 理论宣讲-宣讲项目 */}
          <Route path="/publicityProject" component={PublicityProject} />
          <Route path="/addPublicity" component={AddPublicity} />
          <Route path="/publicityInfo" component={PublicityInfo} />
          <Route path="/publicitOverall" component={PublicitOverall} />
          {/** 理论宣讲-活动池 */}
          <Route path="/activityPond" component={ActivityPond} />
          <Route path="/activityPondView" component={ActivityPondView} />
          {/* 活动管理--志愿汇活动管理 */}
          <Route path="/ZyhActivity" component={ZyhActivity} />
          <Route path="/ZyhActivityInfo" component={ZyhActivityInfo} />
        </Container>
      </Switch>
    </Router>
  );
}

export default RouterConfig;

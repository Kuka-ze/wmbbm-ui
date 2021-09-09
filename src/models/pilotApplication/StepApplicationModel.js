import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/StepApplicationService';
import { download } from '../../utils/util';

export default {
  namespace: 'StepApplicationModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const { id, declareUrl } = yield select(state => state.StepApplicationModel);
      const states = {
        detail: {},
        current: 0,
        steps: [{
          title: '组织架构',
          content: '按照“实践中心—实践所—实践站（社区文化家园、农村 文化礼堂等）”三级体系架构，在县一级成立新时代文明实践中 心，在街道、乡镇一级成立新时代文明实践所，在社区、行政村 一级成立新时代文明实践站。各地选择有条件的文明单位、自然 村、“两新”组织、公共文体场所等成立新时代文明实践点。'
        },
        {
          title: '活动内容',
          content: '组织开展学习科学理论、践行主流价值、繁荣群众文化、 培育文明风尚、加强人文关怀等实践活动。 实践中心和实践所整合基层公共服务等阵地资源，打造理 论宣讲平台、教育服务平台、文化服务平台、科技与科普服务 平台、健身体育服务平台等五大平台阵地。'
        },
        {
          title: '阵地整合',
          content: '实践中心设置理论宣讲、统筹指挥、实践活动、 展示展陈、场所管理等功能，增强综合指挥功能，发挥统筹整 合、刚性调度的作用。展示展陈不得违反省委、省政府相关文 件规定。'
        },
        {
          title: '队伍组建',
          content: '做好各级阵地工作人员、文明实践队和新时代文明实践志 愿服务队等队伍建设。各级阵地建立工作人员队伍，负责场所 日常管理运行；组建各类文明实践队伍，开展理论宣讲、教育 服务、文化服务、科技与科普服务、健身体育服务等活动；做 好新时代文明实践志愿服务队伍组建、孵化培育、培训交流、 志愿服务活动等。'
        },
        {
          title: '功能场所配置',
          content: '实践活动场所结构形式满足使用功能的大空间要求和空间组织的灵活性 要求，不设置固定的座椅和舞台等设施。'
        }],
        tableData1: [
          {
            key: '1',
            data1: '学习科学理论',
            data2: '理论宣讲进基层 行动',
            data3: '学习宣传习近平新时代中国特色社会主义思想，宣传 解读党的十九大精神，阐释宣讲中央大政方针、为民 利民惠民政策等',
          },
          {
            key: '2',
            data1: '学习科学理论',
            data2: '理论宣讲进基层 行动',
            data3: '开展形势政策教育、国防教育和军民共建活动等',
          },
          {
            key: '3',
            data1: '践行主流价值',
            data2: '核心价值普及行动',
            data3: '开展中国特色社会主义和中国梦宣传教育，推进社会 主义核心价值观宣传教育',
          },
          {
            key: '4',
            data1: '践行主流价值',
            data2: '公民道德建设工程',
            data3: '开展爱国主义教育，开展学习时代楷模、道德模范、 最美人物等活动，组织“最美家庭”“最美邻里”、身 边好人等评选评议活动，推进文明村镇、文明家庭、 文明校园创建，完善“最美浙江人”选树关爱激励机 制',
          },
          {
            key: '5',
            data1: '践行主流价值',
            data2: '法治教育',
            data3: '开展宪法学习宣传教育、普法活动等',
          },
          {
            key: '6',
            data1: '繁荣群众文化',
            data2: '优秀文化滋养行动',
            data3: '深化拓展“我们的节日”主题活动',
          },
          {
            key: '7',
            data1: '繁荣群众文化',
            data2: '优秀文化滋养行动',
            data3: '开展乡村广场舞、“我们的村晚”、“我们的村运”、文 化走亲等活动，“千村万镇种文化”、农民丰收节，阅 读、征文、演讲等文化活动，地方性节庆活动',
          },
          {
            key: '8',
            data1: '培育文明风尚',
            data2: '文明好习惯养成 工程',
            data3: '宣传文明餐桌（公筷公勺）、文明出行（礼让斑马线）、 文明旅游、文明上网，开展随手做志愿、垃圾分类、 巡河治水等行动，普及现代文明礼仪知识（工作生活、 社会交往、人际关系、公共场所等方面）等',
          },
          {
            key: '9',
            data1: '培育文明风尚',
            data2: '移风易俗行动',
            data3: '开展移风易俗宣传、教育、治理、建章立制等，加强 无神论宣传教育',
          },
          {
            key: '10',
            data1: '培育文明风尚',
            data2: '好家风建设',
            data3: '开展文明家庭、星级文明户、最美家庭创建等',
          },
          {
            key: '11',
            data1: '加强人文关怀',
            data2: '“最多跑一地”',
            data3: '提供与群众生产生活密切相关的事项代办等服务',
          },
          {
            key: '12',
            data1: '加强人文关怀',
            data2: '邻里守望帮扶行动',
            data3: '为困难群众提供生活服务、康复护理、托养服务、家 庭支持、心理疏导、法律援助等照料帮扶',
          },
          {
            key: '13',
            data1: '加强人文关怀',
            data2: '“春泥计划”',
            data3: '学业辅导、特长教育、亲情连线等',
          },
          {
            key: '14',
            data1: '加强人文关怀',
            data2: '便民服务',
            data3: '免费理发、家电维修、医疗卫生等',
          }
        ],
        tableChecked1: [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        tableData2: [
          {
            key: '1',
            data1: '理论宣讲',
            data2: '议题设置',
            data3: '开展社会调查，围绕影响全局发展的重大政治问题、关乎基层改 革的重要政策问题和关系群众利益的重点民生问题设置议题',
          },
          {
            key: '2',
            data1: '理论宣讲',
            data2: '宣讲方式',
            data3: '以小故事、百姓话、身边事、青年宣讲等形式加强叙事方式， 运用图像、音频、短视频、直播等新媒体方式加强传播力度',
          },
          {
            key: '3',
            data1: '理论宣讲',
            data2: '平台载体',
            data3: '选择农家院坝、工厂车间、城镇社区等“生产生活现场”作为 流动宣讲点、特色宣讲点、固定宣讲点，建立围坐讲台、线上 讲台、名嘴擂台等授课“平台”，开展与惠民服务、文化生活、 情景体验等相结合的宣讲活动',
          },
          {
            key: '4',
            data1: '统筹指挥',
            data2: '打造“文明 大脑”综合 数字平台',
            data3: '打造集信息枢纽和综合服务功能为一体的“文明 大脑”综合数字平台，推行“一图一码一中枢” 文明实践智能体系',
            data4: '依托载体'
          },
          {
            key: '5',
            data1: '统筹指挥',
            data2: '打造“文明 大脑”综合 数字平台',
            data3: '绘制文明实践电子地图，可视化展示 阵地、人员、活动等信息，提供在线 查询功能',
            data4: '依托载体',
            data5: '电子地图'
          },
          {
            key: '6',
            data1: '统筹指挥',
            data2: '打造“文明 大脑”综合 数字平台',
            data3: '推出“文明码”，方便用户即时对接 需求和参与活动',
            data4: '依托载体',
            data5: '文明码'
          },
          {
            key: '7',
            data1: '统筹指挥',
            data2: '打造“文明 大脑”综合 数字平台',
            data3: '设置实践活动动态跟踪、实时管理、 在线配置、用户反馈等功能，分析用 户参与情况和反馈评价情况，向决策 者和活动策划者提供优化提升建议',
            data4: '依托载体',
            data5: '指挥中枢'
          },
          {
            key: '8',
            data1: '统筹指挥',
            data2: '打造“文明 大脑”综合 数字平台',
            data3: '设置进驻组织管理、服务菜单整合、信息推送、 评价需求收集、积分奖励兑换、便民服务联通等 功能应用，精准匹配需求与服务',
            data4: '功能设置'
          },
          {
            key: '9',
            data1: '统筹指挥',
            data2: '推动新时代 文明实践中 心与融媒体 中心融通联 通',
            data3: '依托融媒体中心构建移动端、电视端、PC 端多端 互动的传播矩阵，推动“两个中心”一体化调度、 一体化实践、一体化传播',
            data4: '依托载体'
          },
          {
            key: '10',
            data1: '统筹指挥',
            data2: '推动新时代 文明实践中 心与融媒体 中心融通联 通',
            data3: '设置信息发布、志愿招募、新闻线索、政策信息、 便民服务、道德褒奖、不文明曝光、需求收集等 应用模块，方便群众获取信息服务、互动体验',
            data4: '功能设置'
          },
          {
            key: '11',
            data1: '实践活动',
            data2: '“最多跑 一地”',
            data3: '提供事项代办、公共文化资源获取等服务'
          },
          {
            key: '12',
            data1: '实践活动',
            data2: '志愿服务',
            data3: '培育孵化、培训交流、品牌打造、项目策划、活动组织等'
          },
          {
            key: '13',
            data1: '实践活动',
            data2: '科技科普',
            data3: '提供科技讲座、展览、数字化互动体验等活动'
          },
          {
            key: '14',
            data1: '实践活动',
            data2: '医疗健康',
            data3: '提供健康讲座、展览、义诊服务、心理咨询等活动'
          },
          {
            key: '15',
            data1: '实践活动',
            data2: '教育服务',
            data3: '提供教育讲座、展览、互动体验等活动'
          },
          {
            key: '16',
            data1: '实践活动',
            data2: '文化服务',
            data3: '提供阅读、文艺培训、文艺活动等活动'
          },
          {
            key: '17',
            data1: '实践活动',
            data2: '体育健身',
            data3: '提供健身指导、体育竞技等活动'
          },
          {
            key: '18',
            data1: '场所管理',
            data2: '日常运行',
            data3: '场所设备设施维护等'
          }
        ],
        tableChecked2: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        tableData3: [
          {
            key: '1',
            data1: '队伍组建',
            data2: '建设数量充 足、构成多元、 扎根乡土、富 有活力的志愿 服务队伍',
            data3: '配置“8+N”志愿服务队伍，“8”即理论政策 宣讲、文化文艺服务、助学支教、医疗健身、 科学普及、法律服务、卫生环保、扶贫帮困 等 8 类队伍，“N”即若干支具有自身特色和 优势的志愿服务队伍',
            data4: '志愿服务总队'
          },
          {
            key: '2',
            data1: '队伍组建',
            data2: '建设数量充 足、构成多元、 扎根乡土、富 有活力的志愿 服务队伍',
            data3: '发挥本地乡土文化人才、科技能人、“五老” 人员、新乡贤、创业返乡人员、群众性文体 活动带头人。围绕群众需求开展精神抚慰和 人文关怀类志愿服务',
            data4: '群众身边志愿服务队'
          },
          {
            key: '3',
            data1: '队伍组建',
            data2: '建设数量充 足、构成多元、 扎根乡土、富 有活力的志愿 服务队伍',
            data3: '组建青年、巾帼和文化、文艺、科技、医疗、 环保、司法等重点领域志愿者队伍。组建来 源广泛、类型多样、结构合理的理论宣讲志 愿队伍',
            data4: '重点领域志愿服务队'
          },
          {
            key: '4',
            data1: '队伍组建',
            data2: '建设数量充 足、构成多元、 扎根乡土、富 有活力的志愿 服务队伍',
            data3: '发展具有专业知识、专业技能的志愿者和志 愿服务组织，为群众提供专业、优质服务',
            data4: '专业志愿服务队'
          },
          {
            key: '5',
            data1: '孵化培育',
            data2: '支持和发展新 时代文明实践 志愿服务组织 和项目',
            data3: '提供项目开发、能力培养、业务支持等针对性的服务， 重点加强对区域性、枢纽型、专业型志愿服务组织的培 育扶持，对党和政府主导的重大项目和服务社会发展、 贴近百姓需求的重点项目，给予重点指导和公共资源、 场地、资金和政策等扶持',
          },
          {
            key: '6',
            data1: '培训交流',
            data2: '促进新时代文 明实践志愿服 务队伍能力提 升和专业化发 展',
            data3: '为志愿者骨干和志愿服务组织提供集中辅 导、座谈交流、案例分析、实岗锻炼等方式 的知识和技能培训',
            data4: '培训内容'
          },
          {
            key: '7',
            data1: '培训交流',
            data2: '促进新时代文 明实践志愿服 务队伍能力提 升和专业化发 展',
            data3: '引入社会师资力量，以政企合作、校企合作、 政府购买服务等方式开展培训',
            data4: '培训资源'
          },
          {
            key: '8',
            data1: '培训交流',
            data2: '促进新时代文 明实践志愿服 务队伍能力提 升和专业化发 展',
            data3: '定期开展交流学习，提升志愿服务组织项目 策划、运作和宣传推广能力，挖掘和支持创 新性、专业性、可持续性强的志愿服务项目。',
            data4: '定期交流'
          },
          {
            key: '9',
            data1: '志愿服务活动',
            data2: '丰富和拓展新 时代文明实践 志愿服务项目 和内容',
            data3: '针对不同群体和实践内容，突出项目的引领 性、专业性、普惠性、风尚性和援助性',
            data4: '项目策划'
          },
          {
            key: '10',
            data1: '志愿服务活动',
            data2: '丰富和拓展新 时代文明实践 志愿服务项目 和内容',
            data3: '加强志愿服务信息平台功能提升，动态发布 供需信息、服务项目和活动安排，完善点单、 派单、接单、评单等志愿服务信息化流程',
            data4: '平台优化'
          },
          {
            key: '11',
            data1: '志愿服务活动',
            data2: '丰富和拓展新 时代文明实践 志愿服务项目 和内容',
            data3: '广泛设置标准化志愿服务站点，做到居民集 居区、公共服务区域、窗口单位及其他重点 公共场所全覆盖',
            data4: '站点设置'
          }
        ],
        tableChecked3: [false, false, false, false, false, false, false, false, false, false, false],
        tableData4: [
          {
            key: '1',
            data1: '实践中心',
            data2: '综合管理',
            data3: '综合数字平台操作',
          },
          {
            key: '2',
            data1: '实践中心',
            data2: '综合管理',
            data3: '开综合服务',
          },
          {
            key: '3',
            data1: '实践中心',
            data2: '综合管理',
            data3: '实践队伍办公',
          },
          {
            key: '4',
            data1: '实践中心',
            data2: '综合管理',
            data3: '日常办公',
          },
          {
            key: '5',
            data1: '实践中心',
            data2: '实践活动',
            data3: '理论宣讲',
          },
          {
            key: '6',
            data1: '实践中心',
            data2: '实践活动',
            data3: '科技科普',
          },
          {
            key: '7',
            data1: '实践中心',
            data2: '实践活动',
            data3: '医疗健康',
          },
          {
            key: '8',
            data1: '实践中心',
            data2: '实践活动',
            data3: '教育服务',
          },
          {
            key: '9',
            data1: '实践中心',
            data2: '实践活动',
            data3: '文化服务',
          },
          {
            key: '10',
            data1: '实践中心',
            data2: '实践活动',
            data3: '健身体育',
          },
          {
            key: '11',
            data1: '实践中心',
            data2: '志愿服务',
            data3: '培训孵化',
          },
          {
            key: '12',
            data1: '实践中心',
            data2: '志愿服务',
            data3: '志愿组织日常办公',
          }
        ],
        tableChecked4: [false, false, false, false, false, false, false, false, false, false, false, false],
        submitData: {
          declareUrl
        },
        qiniuData: {},
        fileList: []
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'getQiniuToken', payload: {} });
      if (id) {
        yield put({ type: 'ajaxEditInfo', payload: { id } });
      } else {
        yield put({ type: 'ajaxAddInfo', payload: {} });
      }
    },
    /** 新增试点申报点击 */
    *ajaxAddInfo({ payload }, { call, put, select }) {
      const { submitData } = yield select(state => state.StepApplicationModel);
      const { data, code } = yield call(PublicService.ajaxAddInfo, payload);
      let datas = { ...data };
      datas.provinceCode = data.province_code;
      delete datas.province_code;
      datas.cityCode = data.city_code;
      delete datas.city_code;
      datas.areaCode = data.area_code;
      delete datas.area_code;
      datas.centerId = data.center_id;
      delete datas.center_id;
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            submitData: { ...submitData, ...datas }
          }
        });
      }
    },
    /** 编辑详情 */
    *ajaxEditInfo({ payload }, { call, put, select }) {
      const { submitData } = yield select(state => state.StepApplicationModel);
      const { data, code } = yield call(PublicService.ajaxEditInfo, payload);
      if (code === 1) {
        let fileList = [];
        if (data.organizationList) {
          /**
            * 截取指定字符后的内容
            * @param url 路径
            * @param parameter 字符
            */
          function getCaption(url, parameter) {
            var index = url.lastIndexOf(parameter);
            url = url.substring(index + 1, url.length);
            return url;
          }
          let obj = [{
            uid: 0,
            name: '新时代文明实践所、站、点清单',
            // name: getCaption(data.organizationList, "/"),
            status: 'done',
            url: data.organizationList,
          }];
          fileList = obj;
        }
        yield put({
          type: 'concat',
          payload: {
            detail: data,
            tableChecked1: data.activityCheckout,
            tableChecked2: data.positionCheckout,
            tableChecked3: data.teamCheckout,
            tableChecked4: data.placeCheckout,
            submitData: { ...submitData, organizationList: data.organizationList },
            fileList
          }
        });
      }
    },
    /** 新增 */
    *ajaxAdd({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxAdd, payload);
      if (code == 1) {
        message.success('新增成功！');
        window.location.href = `#/pilotApplication`;
        // history.go(-1);
      }
    },
    /** 编辑 */
    *ajaxEdit({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxEdit, payload);
      if (code == 1) {
        message.success('编辑成功！');
        window.location.href = `#/pilotApplication`;
        // history.go(-1);
      }
    },
    /** 七牛 */
    *getQiniuToken({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.getQiniuToken, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            qiniuData: data,
          }
        });
      }
    },
    // 下载
    *getExcel({ payload }, { call, put, select }) {
      const { code, data } = yield call(PublicService.getExcel, payload);
      if (code == 1) {
        if (data) {
          download(data.down_url);
        }
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        function initData() {
          dispatch({
            type: 'concat', payload: {
              type: query.type == 4 || query.type == 5 ? 3 : query.type,
              types: query.type,
              id: query.id,
              declareUrl: query.declareUrl,
              menberType: query.menberType
            }
          });
          dispatch({ type: 'init' });
        }
        if (pathname === '/stepApplication') {
          initData();
        }
      })
    }
  }
}

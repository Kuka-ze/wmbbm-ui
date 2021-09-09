import { message } from 'antd';
import queryString from 'query-string';
import VolunteerService from '../../services/VolunteerService';
export default {
    namespace: 'VolunteerAddEditModel',
    state: {},
    reducers: {
        concat(state, { payload }) {
            return {...state, ...payload }
        }
    },
    effects: {
        * init({ payload }, { call, put, select }) {
            yield put({ type: 'skillList' });
            // yield put({ type: 'ajaxCenterTeamDrop' });
            yield put({ type: 'tagList' });
        },
        * skillList({ payload }, { call, put, select }) {
            const { data, code } = yield call(VolunteerService.skillList, payload);
            if (code === 1) {
                const { list = [] } = data;
                yield put({
                    type: 'concat',
                    payload: {
                        skillsType: list || [],
                    }
                });
            }
        },
        * volunteerAdd({ payload }, { call, put, select }) {
            const { code } = yield call(VolunteerService.volunteerAdd, payload);
            if (code == 1) {
                message.success('新增成功！');
                location.href = "#/volunteer";
            }
        },
        // 志愿者新增 - 根据手机号查询志愿者
        * volunteerMobile({ payload, callback }, { call, put, select }) {
            const { data, code } = yield call(VolunteerService.volunteerMobile, payload);
            if (code === 1) {

                yield put({
                    type: 'concat',
                    payload: {
                        mobileType: data && data.type,
                        mobile: data && data.mobile,
                        userList: data && data.teams || [],
                        uuid: data.teams && data.teams.length > 0 ? data.teams.length : 1
                    }
                });
                callback && callback(data && data.teams)
                yield put({ type: 'ajaxCenterTeamDrop', payload: {
                    volunteerId: data && data.id,
                } });
            }
        },
        // 志愿者编辑
        * volunteerEdit({ payload }, { call, put, select }) {
            const { code } = yield call(VolunteerService.volunteerEdit, payload);
            if (code == 1) {
                message.success('编辑成功！');
                location.href = "#/volunteer";
            }
        },
        * ajaxCenterTeamDrop({ payload }, { call, put, select }) {
            const { code, data } = yield call(VolunteerService.ajaxCenterTeamDrop, payload);
            if (code == 1) {
                const { list = [] } = data;
                yield put({
                    type: 'concat',
                    payload: {
                        options: list || [],
                    }
                });
            }
        },
        /* 志愿者管理详情与编辑 */
        * volunteerInfo({ payload }, { call, put, select }) {
            const { data, code } = yield call(VolunteerService.volunteerInfo, payload);
            if (code === 1) {
                if (data.portrait) {
                    let obj = [{
                        uid: 0,
                        name: `img0`,
                        status: 'done',
                        url: data.portrait,
                    }];
                    data.portrait = obj;
                }
                yield put({
                    type: 'concat',
                    payload: {
                        detail: data || {},
                        userList: data && data.teams || [],
                        uuid: data.teams && data.teams.length > 0 ? data.teams.length : 0


                    }
                });
            }
        },
        /* 志愿者管理详情与编辑 */
        * volunteerDetail({ payload }, { call, put, select }) {
            const { data, code } = yield call(VolunteerService.volunteerDetail, payload);
            if (code === 1) {
                if (data.portrait) {
                    let obj = [{
                        uid: 0,
                        name: `img0`,
                        status: 'done',
                        url: data.portrait,
                    }];
                    data.portrait = obj;
                }
                yield put({
                    type: 'concat',
                    payload: {
                        detail: data || {},
                        userList: data && data.teams || [],
                        uuid: data.teams && data.teams.length > 0 ? data.teams.length : 0


                    }
                });
            }
        },
        /* 标签选择列表 */
        *tagList({ payload }, { call, put, select }) {
            const { data, code } = yield call(VolunteerService.tagList, payload);
            if (code === 1) {
                let { list = [] } = data;
                yield put({
                    type: 'concat',
                    payload: {
                        tagList: list || [],
                    }
                });
            }else{
                let data = {
                    "list": [
                      {
                        "key": "1",
                        "value": "标签类型",
                        "type": 1,
                        "tags": [
                          {
                            "key": "1",
                            "value": "标签名称"
                          }
                        ]
                      }
                    ]
                }
                let { list = [] } = data;
                yield put({
                    type: 'concat',
                    payload: {
                        tagList: list || [],
                    }
                });
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, search }) => {
                const query = queryString.parse(search);

                function initData() {
                    dispatch({
                        type: 'concat',
                        payload: {
                            id: query.id,
                            enterpriseType: [],
                            detail: {},
                            sex: '',
                            age: '',
                            current: 0,
                            disabledName: false,
                            options: [],
                            uuid: 1,
                            userList: [],
                            mobileType: 0,
                            mobile: null,
                            isInput: false,
                            isSubmit: false,
                            previewVisible: false,
                            previewImage: '',
                            tagList: []
                        }
                    });
                    dispatch({ type: 'init' });
                }
                if (pathname === '/volunteerAdd') {
                    initData();
                    dispatch({
                        type: 'ajaxCenterTeamDrop',
                        payload: { }
                    })
                } else if (pathname === '/volunteerEdit') {
                    initData();
                    if (query.id) {
                        dispatch({
                            type: 'ajaxCenterTeamDrop',
                            payload: { volunteerId: query.id }
                        })
                        dispatch({
                            type: 'volunteerInfo',
                            payload: { id: query.id }
                        })
                    }
                } else if (pathname === '/volunteerDetail') {
                    initData();
                    if (query.id) {
                        dispatch({
                            type: 'ajaxCenterTeamDrop',
                            payload: { volunteerId: query.id }
                        })
                        dispatch({
                            type: 'volunteerDetail',
                            payload: { id: query.id }
                        })
                    }
                }
            })
        }
    }
}
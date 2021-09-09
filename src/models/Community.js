import CommonInterface from './../services/CommonInterface';

export default {
  namespace: 'CommunityModel',
  state: {
    communityList:[],
    groupData:[],
    buildingData:[],
    unitData:[],
    roomData:[],
  },
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *initValue({ payload }, {  put }) {
      yield put({
        type: 'concat',
        payload: {
          groupData: [],
          buildingData:[],
          unitData:[],
          roomData:[],
        }
      });
    },
    *getCommunityList({ payload }, { call, put }) {
      const { data,code } = yield call(CommonInterface.community, payload);
      if(code == 20000){
        yield put({
          type: 'concat',
          payload: {
            communityList: data?data.community_lists:[],
          }
        });
      }
    },
    *getGroupList({ payload }, { call, put }) {
      const { data,code } = yield call(CommonInterface.group, payload);
      if(code == 20000){
        yield put({
          type: 'concat',
          payload: {
            groupData: data?data:[],
            buildingData:[],
            unitData:[],
            roomData:[],
          }
        });
      }
    },
    *getBuildingList({ payload }, { call, put }) {
      const { data,code } = yield call(CommonInterface.building, payload);
      if(code == 20000){
        yield put({
          type: 'concat',
          payload: {
            buildingData: data?data:[],
            unitData:[],
            roomData:[],
          }
        });
      }
    },
    *getUnitList({ payload }, { call, put }) {
      const { data,code } = yield call(CommonInterface.unit, payload);
      if(code == 20000){
        yield put({
          type: 'concat',
          payload: {
            unitData: data?data:[],
            roomData:[],
          }
        });
      }
    },
    *getRoomList({ payload }, { call, put }) {
      const { data,code } = yield call(CommonInterface.room, payload);
      if(code == 20000){
        yield put({
          type: 'concat',
          payload: {
            roomData: data?data:[],
          }
        });
      }
    },
  },
  subscriptions: {},
};

import http from '@/utils/httpIndex'

const state = {
  webinfo: "",
  tag: "",
  classify: "",
  banners: [
    {
      url: require("@/assets/banner1.jpg")
    },
    {
      url: require("@/assets/banner2.jpg")
    },
    {
      url: require("@/assets/banner3.jpg")
    },
    {
      url: require("@/assets/banner4.jpg")
    },
    {
      url: require("@/assets/banner5.jpg")
    },
    {
      url: require("@/assets/message.jpg")
    }
  ]
};

// 获取state的数据
const getters = {
  webInfo: state => state.webinfo,
  tag: state => state.tag,
  classify: state => state.classify,
  banners: state=> state.banners
}

// 更新state的数据
const mutations = {
  WEBINFO(state, data) {
    state.webinfo = data
  },
  TAG(state, data) {
    state.tag = data
    state.classify = ''
  },
  CLASSIFY(state, data) {
    state.classify = data
    state.tag = ''
  },
  BANNERS(state, data) {
    state.banners = data
  }
}

// 更新state数据的动作
const actions = {
  async WebInfo({ commit }, data) {
    const res = await http.get('/api/webinfo/read')
    commit('WEBINFO', res.data)
  },
  Tag({ commit }, data) {
    commit('TAG', data)
  },
  Classify({ commit }, data) {
    commit('CLASSIFY', data)
  },
  async Banners({ commit }, data) {
    const res = await http.post('/api/ad', {type: 'banner'})
    commit('BANNERS', res.data)
  }
}


export default {state, getters, mutations, actions}


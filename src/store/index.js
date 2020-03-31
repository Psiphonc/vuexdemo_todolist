import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 任务列表
    list: [],
    // 文本框的内容绑定
    inputVal: '',
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    // 为store的inputVal赋值
    setInputVal(state, newVal) {
      state.inputVal = newVal
    },
    addItem(state) {
      const obj = {
        id: state.nextId++,
        info: state.inputVal,
        done: false
      }
      state.list.push(obj)
      state.inputVal = ''
    },
    removeItem(state, id) {
      // 根据id查找对应索引
      const idx = state.list.findIndex(_ => _.id === id)
      // 根据索引删除对应元素
      if (idx !== -1) {
        state.list.splice(idx, 1)
      }
    },
    changeStatus(state, param) {
      const { id, status } = param
      const idx = state.list.findIndex(_ => _.id === id)
      if (idx !== -1) {
        state.list[idx].done = status
      }
    },
    clearDone(state) {
      state.list = state.list.filter(_ => !_.done)
    },
    viewChange(state, vk) {
      state.viewKey = vk
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initList', data)
      })
    }
  },
  getters: {
    // 统计未完成的任务
    undoneCnt(state) {
      return state.list.filter(_ => !_.done).length
    },
    info(state) {
      if (state.viewKey === 'all') return state.list
      if (state.viewKey === 'undone') return state.list.filter(_ => !_.done)
      if (state.viewKey === 'done') return state.list.filter(_ => _.done)
    }
  }
})

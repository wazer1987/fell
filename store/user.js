import { http } from '../plugins/axios'
export const state = () => ({
  token: '',
  id: '',
  email: '',
  nickname: ''
})
export const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    console.log(user, '---mutaitions')
    state.id = user._id
    state.email = user.email
    state.nickname = user.nickname
  }
}
export const actions = {
  async login({ state, commit }, data) {
    console.log(this, 'vuex')
    // const ret = await http.post('/user/login', data)
    const ret = await this.$login(data)
    commit('SET_TOKEN', ret.data.token)
    return ret
  },
  async detail({ state, commit }) {
    console.log(1111)
    const ret = await http.get('/user/detail')
    console.log(ret, '-----detail')
    if (ret.code === 0) {
      commit('SET_USER', ret.data)
      return ret
    }
  }
}
// export default {
//   // namespaced: true,
//   state,
//   mutations,
//   actions
// }

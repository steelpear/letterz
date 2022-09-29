export const state = () => ({
  token: null,
  role: '',
  categories: [
    'Поздравления',
    'Благодарности',
    'Коллегам',
    'Любимым',
    'Родным',
    'Ищу тебя',
    'Просьбы о помощи',
    'Для всех'
  ]
})

export const getters = {
  hasToken: state => !!state.token,
  get_categories: state => state.categories,
  get_role: state => state.role
}

export const mutations = {
  setToken (state, token) { state.token = token },
  clearToken (state) { state.token = null },
  set_role (state, role) { state.role = role }
}

export const actions = {
  login ({ commit }) { commit('setToken', 'truetoken') },
  logout ({ commit }) { commit('clearToken') },
  set_role: ({ commit }, role) => { commit('set_role', role) }
}

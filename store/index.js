export const state = () => ({
  role: '',
  categories: [
    'Поздравления',
    'Благодарности',
    'Любимым',
    'Родным',
    'Ищу тебя',
    'Просьбы о помощи',
    'Для всех',
    'На фронт'
  ]
})

export const getters = {
  get_categories: state => state.categories,
  get_role: state => state.role
}

export const mutations = {
  set_role (state, role) { state.role = role }
}

export const actions = {
  set_role: ({ commit }, role) => { commit('set_role', role) }
}

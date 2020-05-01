// TODO: remove redundant predicate function

const state = []

const getters = {
  getHoldByPosition: state => data => {
    return state.find(hold => hold.x === data.x && hold.y === data.y)
  }
}

const mutations = {
  ADD_HOLD(state, data) {
    state.push(data)
  },
  UPDATE_HOLD(state, data) {
    let hold = state.find(hold => hold.x === data.x && hold.y === data.y) //eslint-disable-line no-unused-vars
    hold.x = data.x
    hold.y = data.y
    hold.z = data.z
    hold.type = data.type
  },
  REMOVE_HOLD(state, data) {
    let indexToRemove = state.findIndex(hold => hold.x === data.x && hold.y === data.y)
    state.splice(indexToRemove, 1)
  }
}

const actions = {
  addHold({ commit }, data) {
    commit('ADD_HOLD', data)
  },
  updateHold({ commit }, data) {
    commit('UPDATE_HOLD', data)
  },
  removeHold({ commit }, data) {
    commit('REMOVE_HOLD', data)
  }
}

export default { state, getters, mutations, actions }

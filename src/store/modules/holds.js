// TODO: remove redundant predicate function

const state = []

const getters = {
  getHoldByPosition: (state) => ({ x, y }) => {
    return state.find(hold => hold.position.x === x && hold.position.y === y)
  }
}

const mutations = {
  ADD_HOLD(state, { x, y }) {
    state.push({
      type: 'sloper',
      position: {
        x,
        y,
        z: 0,
      },
      rotation: {
        x: 0,
        y: 0,
        z: 0
      },
      scale: {
        x: 1,
        y: 1,
        z: 1
      }
    })
  },
  UPDATE_HOLD(state, data) {
    let hold = state.find(hold => hold.position.x === data.position.x && hold.position.y === data.position.y)
    Object.assign(hold, data)
  },
  REMOVE_HOLD(state, { x, y }) {
    let indexToRemove = state.findIndex(hold => hold.position.x === x && hold.position.y === y)
    state.splice(indexToRemove, 1)
  }
}

const actions = {
  addHold({ commit }, position) {
    commit('ADD_HOLD', position)
  },
  updateHold({ commit }, data) {
    commit('UPDATE_HOLD', data)
  },
  removeHold({ commit }, position) {
    commit('REMOVE_HOLD', position)
  }
}

export default { state, getters, mutations, actions }

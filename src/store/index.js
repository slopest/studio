import Vue from 'vue'
import Vuex from 'vuex'

import holds from './modules/holds'

Vue.use(Vuex)

const state = {}
const getters = {}
const mutations = {}
const actions = {}

const modules = {
  holds
}

export default new Vuex.Store({ state, getters, mutations, actions, modules })

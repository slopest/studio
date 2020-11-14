import Vue from 'vue'
import Vuex from 'vuex'

import holds from '@/store/modules/holds'
import projects from '@/store/modules/projects'

Vue.use(Vuex)

const state = {}
const getters = {}
const mutations = {}
const actions = {}

const modules = { holds, projects }

export default new Vuex.Store({ state, getters, mutations, actions, modules })

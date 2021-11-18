import Vue from 'vue'
import Vuex from 'vuex'

import actions from './action'
import { SET_LOCATION, SET_ADDRESS, SET_ADDTOCART, SET_ADDCOUNTER, SET_DECREMENT, DEL_FROMCART } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    location: {},
    address: '',
    cartList: []
  },
  mutations: {
    [SET_LOCATION](state, payload) {
      state.location = payload
    },
    [SET_ADDRESS](state, payload) {
      state.address = payload
    },
    [SET_ADDTOCART](state, payload) {
      state.cartList.push(payload)
    },
    [SET_ADDCOUNTER](state, payload) {
      payload.count++
    },
    [SET_DECREMENT](state, payload) {
      payload.count--
    },
    [DEL_FROMCART](state, payload) {
      state.cartList.splice(payload, 1)
    },
    delAllCart(state, payload) {
      payload.count = 0
      state.cartList = []
    }

  },
  actions,
  getters: {
    getAddress: state => {
      return state.address
    },
    getLocation: state => {
      return state.location
    },
    getCartList(state) {
      return state.cartList
    }
  },
  modules: {
  }
})

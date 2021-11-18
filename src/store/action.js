import { SET_LOCATION, SET_ADDRESS, SET_ADDTOCART, SET_ADDCOUNTER, SET_DECREMENT, DEL_FROMCART } from './mutation-types'

export default {
  setLocation(context, location) {
    return new Promise((resolve, reject) => {
      resolve('添加定位成功')
      context.commit(SET_LOCATION, location)
    })
  },
  setAddress(context, address) {
    return new Promise((resolve, reject) => {
      resolve('添加位置成功')
      context.commit(SET_ADDRESS, address)
    })
  },
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduce = context.state.cartList.find(item => {
        return item.name === payload.name
      })

      // let oldProduce = context.state.cartList.find(item => item.name === payload.name)

      if (oldProduce) {
        context.commit(SET_ADDCOUNTER, oldProduce)
        resolve('数量+1')
      } else {
        payload.count = 1
        context.commit(SET_ADDTOCART, payload)
        resolve('添加购物车成功')
      }

    })
  },
  decrement(context, payload) {
    if (payload.count > 1) {
      context.commit(SET_DECREMENT, payload)
    } else {
      context.state.cartList.forEach((item, index, arr) => {
        if (item.name == payload.name) {
          context.commit(SET_DECREMENT, payload)
          context.commit(DEL_FROMCART, index)
        }
      });
    }
  },
  clearCart(context) {
    context.state.cartList.forEach(item => {
      context.commit('delAllCart', item)
    })
  }
}
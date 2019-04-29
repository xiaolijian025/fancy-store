import * as types from "./mutation-types";
const cartArr = [];
const addressArr = [];
const matutaions = {
    /*购物车*/
    [types.SET_CARTS](state, carts) {
        cartArr.push(carts);
        state.carts = cartArr;
    },
    /*订单*/
    [types.SET_ORDERS](state, orders) {
        state.orders = orders;
    },
    /*用户信息*/
    [types.SET_USER](state, user) {
        state.user = user;
    },
    /*购物车数量*/
    [types.SET_CARTSLENGTH](state, cartsLength) {
        state.cartsLength = cartsLength;
    }
};
export default matutaions;

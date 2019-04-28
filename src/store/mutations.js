import * as types from "./mutation-types";
const cartArr = [];
const addressArr = [];
const matutaions = {
    /*购物车*/
    [types.SET_CARTS](state, carts) {
        cartArr.push(carts);
        state.carts = cartArr;
    }
};
export default matutaions;

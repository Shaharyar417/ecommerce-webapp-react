import { createSelector, createStructuredSelector } from "reselect";

//input selector: it will recieve whole state and give slice of it
const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity, 0
    )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity * cartItem.price, 0
    )
);
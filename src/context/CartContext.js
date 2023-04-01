import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  removeAllCartItems: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
})

export default CartContext

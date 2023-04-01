import {FaRupeeSign} from 'react-icons/fa'

import CartContext from '../../context/CartContext'

import './index.css'

const CartTotal = props => {
  const {orderPlaced} = props

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        let totalOrderCost = 0
        cartList.forEach(eachCartItem => {
          totalOrderCost += eachCartItem.cost * eachCartItem.quantity
        })

        const onClickPlaceOrder = () => {
          orderPlaced()
        }

        return (
          <>
            <hr className="dash-line" />
            <div className="cart-summary">
              <h1 className="order-total">Order Total:</h1>
              <p data-testid="total-price" className="total-price">
                <FaRupeeSign size={14} /> {totalOrderCost}
              </p>
            </div>
            <button
              type="button"
              className="order-button"
              onClick={onClickPlaceOrder}
            >
              Place Order
            </button>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartTotal

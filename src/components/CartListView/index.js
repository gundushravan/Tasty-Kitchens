import {Component} from 'react'

import CartOrderSuccess from '../CartOrderSuccess'
import CartItems from '../CartItems'
import CartTotal from '../CartTotal'

import CartContext from '../../context/CartContext'

import './index.css'

class CartListView extends Component {
  state = {
    isOrderPlaced: false,
  }

  orderPlaced = () => {
    this.setState(prevState => ({isOrderPlaced: !prevState.isOrderPlaced}))
  }

  render() {
    const {isOrderPlaced} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          return isOrderPlaced ? (
            <CartOrderSuccess />
          ) : (
            <div className="cart-content-container">
              <div className="cart-header-items">
                <p className="cart-heading">Item</p>
                <p className="cart-heading">Quantity</p>
                <p className="cart-heading">Price</p>
              </div>

              {cartList.map(eachItem => (
                <CartItems key={eachItem.id} cartItem={eachItem} />
              ))}

              <CartTotal orderPlaced={this.orderPlaced} />
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartListView

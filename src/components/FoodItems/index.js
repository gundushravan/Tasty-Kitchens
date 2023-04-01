import {Component} from 'react'
import {FaStar} from 'react-icons/fa'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'
import CartContext from '../../context/CartContext'

import './index.css'

class FoodItems extends Component {
  state = {
    quantity: 0,
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {increaseQuantity, decreaseQuantity, addCartItem} = value
          const {itemDetails} = this.props
          const {id, imageUrl, name, cost, rating} = itemDetails
          const {quantity} = this.state

          const onClickAddButton = () => {
            this.setState(
              prevState => ({
                quantity: prevState.quantity + 1,
              }),
              addCartItem({...itemDetails, quantity: quantity + 1}),
            )
          }

          const onDecreaseQuantity = () => {
            this.setState(prevState => ({quantity: prevState.quantity - 1}))
            decreaseQuantity(id)
          }

          const onIncreaseQuantity = () => {
            this.setState(prevState => ({quantity: prevState.quantity + 1}))
            increaseQuantity(id)
          }

          return (
            <li data-testid="foodItem" className="food-list">
              <img src={imageUrl} alt={name} className="food-image" />
              <div className="food-details">
                <h1 className="food-name">{name}</h1>
                <div className="cost-div">
                  <BiRupee />
                  <p className="food-cost">{cost}</p>
                </div>
                <div className="food-rating-div">
                  <FaStar color="#FFCC00" />
                  <p className="food-rating">{rating}</p>
                </div>

                {quantity === 0 ? (
                  <button
                    type="button"
                    className="food-add-btn"
                    onClick={onClickAddButton}
                  >
                    Add
                  </button>
                ) : (
                  <div className="cart-quantity">
                    <button
                      data-testid="decrement-count"
                      type="button"
                      className="decrement-count"
                      onClick={onDecreaseQuantity}
                    >
                      <BsDashSquare className="quantity-icon" />
                    </button>
                    <p data-testid="active-count" className="active-count">
                      {quantity}
                    </p>
                    <button
                      data-testid="increment-count"
                      type="button"
                      className="increment-count"
                      onClick={onIncreaseQuantity}
                    >
                      <BsPlusSquare className="quantity-icon" />
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default FoodItems

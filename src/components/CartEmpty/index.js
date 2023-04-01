import {Link} from 'react-router-dom'

import './index.css'

const CartEmpty = () => (
  <div className="empty-container">
    <img
      src="https://res.cloudinary.com/dtkrnw0fu/image/upload/v1680087714/OBJECTS_xan0cs.png"
      alt="empty cart"
      className="empty-image"
    />
    <h1 className="empty-heading">No Order Yet!</h1>
    <p className="empty-text">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/" className="empty-link">
      <button type="button" className="empty-order">
        Order Now
      </button>
    </Link>
  </div>
)

export default CartEmpty

import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const RestaurantItems = props => {
  const {itemDetails} = props
  const {id, imageUrl, name, cuisine, userRating} = itemDetails
  return (
    <Link to={`/restaurant/${id}`} className="item-link">
      <li key={id} data-testid="restaurant-item" className="rest-item">
        <img src={imageUrl} alt="restaurant" className="rest-image" />
        <div className="rest-details">
          <h1 className="rest-name">{name}</h1>
          <p className="rest-cuisine">{cuisine}</p>
          <div className="rest-ratings">
            <AiFillStar color="#FFCC00" className="star-icon" size="12" />
            <p className="rest-userRating">{userRating.rating}</p>
            <p className="total-reviews">({userRating.totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItems

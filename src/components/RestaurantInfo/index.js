import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import FoodItems from '../FoodItems'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class RestaurantInfo extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    restaurantsInfo: [],
  }

  componentDidMount() {
    this.getRestaurantInfo()
  }

  getRestaurantInfo = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.id,
        name: data.name,
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        foodItems: data.food_items.map(each => ({
          name: each.name,
          cost: each.cost,
          foodType: each.food_type,
          imageUrl: each.image_url,
          rating: each.rating,
          id: each.id,
        })),
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        restaurantsInfo: updatedData,
      })
    }
  }

  renderLoader = () => (
    <div
      data-testid="restaurant-details-loader"
      className="details-loader-container"
    >
      <Loader type="Oval" color="#F7931E" width="100%" height="100%" />
    </div>
  )

  renderRestaurantsInfo = () => {
    const {restaurantsInfo} = this.state
    const {
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
      imageUrl,
      foodItems,
    } = restaurantsInfo

    return (
      <>
        <div className="rest-top-section">
          <div className="rest-banner">
            <img
              alt="restaurant"
              src={imageUrl}
              className="rest-banner-image"
            />
            <div className="rest-info">
              <h1 className="rest-banner-name">{name}</h1>
              <p className="rest-banner-cuisine">{cuisine}</p>
              <p className="rest-banner-cuisine">{location}</p>
              <div className="ratings-cost-container">
                <div className="star-rating">
                  <div className="star-text">
                    <AiFillStar color="#FFFFFF" />
                    <p className="rest-banner-rating">{rating}</p>
                  </div>
                  <p className="rest-banner-reviews">{reviewsCount}+ Ratings</p>
                </div>
                <hr className="banner-line" />
                <div className="cost-two">
                  <div className="cost-container">
                    <BiRupee size="18" color="#ffffff" />
                    <p className="rest-banner-cost">{costForTwo}</p>
                  </div>
                  <p className="rest-cost">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-container">
          {foodItems.map(eachItem => (
            <FoodItems
              key={eachItem.id}
              id={eachItem.id}
              itemDetails={eachItem}
            />
          ))}
        </ul>
      </>
    )
  }

  renderRestaurantsInfoBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderRestaurantsInfo()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="rest-info-container">
        <Header />
        {this.renderRestaurantsInfoBasedOnApiStatus()}
        <Footer />
      </div>
    )
  }
}
export default RestaurantInfo

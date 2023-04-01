import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import RestaurantItems from '../RestaurantItems'
import RestaurantsHeader from '../RestaurantsHeader'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 1,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Restaurants extends Component {
  state = {
    restaurantsList: [],
    apiStatus: apiStatusConstants.initial,
    activePage: 1,
    limit: 9,
    activeSortByOption: sortByOptions[1].value,
  }

  componentDidMount() {
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {activePage, limit, activeSortByOption} = this.state
    const offset = (activePage - 1) * limit
    const restaurantsListApi = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeSortByOption}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(restaurantsListApi, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(eachItem => ({
        hasOnlineDelivery: eachItem.has_online_delivery,
        userRating: {
          ratingText: eachItem.user_rating.rating_text,
          ratingColor: eachItem.user_rating.rating_color,
          totalReviews: eachItem.user_rating.total_reviews,
          rating: eachItem.user_rating.rating,
        },
        name: eachItem.name,
        hasTableBooking: eachItem.has_table_booking,
        isDeliveringNow: eachItem.is_delivering_now,
        costForTwo: eachItem.cost_for_two,
        cuisine: eachItem.cuisine,
        imageUrl: eachItem.image_url,
        id: eachItem.id,
        menuType: eachItem.menu_type,
        location: eachItem.location,
        opensAt: eachItem.opens_at,
        groupByTime: eachItem.group_by_time,
      }))
      this.setState({
        restaurantsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoader = () => (
    <div data-testid="restaurants-list-loader" className="restaurants-loader">
      <Loader type="Oval" color="#F7931E" width="100%" height="100%" />
    </div>
  )

  onChangeSortByOptions = option => {
    this.setState({activeSortByOption: option}, this.getRestaurantsList)
  }

  paginationIncrement = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState({activePage: activePage + 1}, this.getRestaurantsList)
    }
  }

  paginationDecrement = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState({activePage: activePage - 1}, this.getRestaurantsList)
    }
  }

  renderRestaurantsList = () => {
    const {restaurantsList, activePage} = this.state
    return (
      <>
        <ul className="restaurants-unorderedList">
          {restaurantsList.map(eachItem => (
            <RestaurantItems key={eachItem.id} itemDetails={eachItem} />
          ))}
        </ul>
        <div className="pagination-div">
          <button
            type="button"
            className="page-button"
            onClick={this.paginationDecrement}
            data-testid="pagination-left-button"
          >
            <IoIosArrowBack />
          </button>

          <p className="page-number">
            <span data-testid="active-page-number">{activePage}</span> of 4
          </p>

          <button
            type="button"
            className="page-button"
            data-testid="pagination-right-button"
            onClick={this.paginationIncrement}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </>
    )
  }

  renderPageBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderRestaurantsList()
      default:
        return null
    }
  }

  render() {
    const {activeSortByOption} = this.state
    return (
      <div className="restaurants-container">
        <RestaurantsHeader
          sortByOptions={sortByOptions}
          activeSortByOption={activeSortByOption}
          onChangeSortByOptions={this.onChangeSortByOptions}
        />
        {this.renderPageBasedOnApiStatus()}
      </div>
    )
  }
}
export default Restaurants

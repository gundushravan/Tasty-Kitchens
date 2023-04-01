import {Component} from 'react'

import Cookies from 'js-cookie'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: true,

  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  adaptiveHeight: true,
  appendDots: dots => (
    <div className="slick-dots">
      <ul>{dots}</ul>
    </div>
  ),
}

class OffersCarousel extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    offersList: [],
  }

  componentDidMount() {
    this.getCarouselData()
  }

  getCarouselData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const offersApi = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(offersApi, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.offers.map(eachOffer => ({
        id: eachOffer.id,
        imageUrl: eachOffer.image_url,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        offersList: updatedData,
      })
    }
  }

  renderCarouselOffers = () => {
    const {offersList} = this.state

    return (
      <div className="slider-container">
        <Slider {...settings}>
          {offersList.map(eachOffer => (
            <div key={eachOffer.id}>
              <img
                src={eachOffer.imageUrl}
                className="carousel-image"
                alt="offer"
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  renderLoader = () => (
    <div className="carousel-loader" data-testid="restaurants-offers-loader">
      <Loader type="Oval" color="#F7931E" width="100%" height="100%" />
    </div>
  )

  renderCarouselOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCarouselOffers()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="carousel-container">
        {this.renderCarouselOnApiStatus()}
      </div>
    )
  }
}

export default OffersCarousel

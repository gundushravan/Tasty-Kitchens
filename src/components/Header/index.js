import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'

import {GiHamburgerMenu} from 'react-icons/gi'

import {IoCloseCircle} from 'react-icons/io5'
import './index.css'

const linkItems = [
  {id: 0, path: 'Home', displayText: 'Home'},
  {id: 1, path: 'Cart', displayText: 'Cart'},
  {id: 2, displayText: 'Logout'},
  {id: 3, path: 'Profile', displayText: 'Profile'},
]

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const {activeTabId} = props

  const renderHamburgerPopup = () => (
    <Popup
      modal
      trigger={
        <button type="button" className="ham-button">
          <GiHamburgerMenu size="25" />
        </button>
      }
      className="popup-content"
    >
      {close => (
        <div className="mobile-popup">
          <ul className="mobile-links">
            <li key={linkItems[0].id} className="mbl-item">
              <Link
                to="/"
                className={
                  activeTabId === linkItems[0].path
                    ? `link-mobile active-mobile`
                    : 'link-mobile'
                }
              >
                {linkItems[0].displayText}
              </Link>
            </li>
            <li key={linkItems[1].id} className="mbl-item">
              <Link
                to="/cart"
                className={
                  activeTabId === linkItems[1].path
                    ? `link-mobile active-mobile`
                    : 'link-mobile'
                }
              >
                {linkItems[1].displayText}
              </Link>
            </li>
            <li key={linkItems[3].id} className="mbl-item">
              <Link
                to="/profile"
                className={
                  activeTabId === linkItems[3].path
                    ? `link-mobile active-mobile`
                    : 'link-mobile'
                }
              >
                {linkItems[3].displayText}
              </Link>
            </li>

            <li key={linkItems[2].id} className="mbl-item">
              <button
                className="mobile-logout"
                type="button"
                onClick={onClickLogout}
              >
                {linkItems[2].displayText}
              </button>
            </li>
          </ul>
          <button type="button" className="popup-close" onClick={() => close()}>
            <IoCloseCircle size="20" color="#334155" />
          </button>
        </div>
      )}
    </Popup>
  )

  return (
    <nav className="nav-header">
      <div className="nav-content-small">
        <Link to="/" className="nav-link">
          <div className="logo-name">
            <img
              alt="website logo"
              src="https://res.cloudinary.com/dtkrnw0fu/image/upload/v1680085469/Frame_274_sadxnc.png"
              className="header-logo"
            />
            <h1 className="header-heading">Tasty Kitchens</h1>
          </div>
        </Link>
        <div className="nav-links-small">{renderHamburgerPopup()}</div>
      </div>

      <div className="nav-content-large">
        <Link to="/" className="nav-link">
          <div className="logo-large">
            <img
              alt="website logo"
              src="https://res.cloudinary.com/dtkrnw0fu/image/upload/v1680085469/Frame_274_sadxnc.png"
              className="header-logo-large"
            />
            <h1 className="header-heading">Tasty Kitchens</h1>
          </div>
        </Link>
        <div className="links-large">
          <ul className="nav-ul">
            <li key={linkItems[0].id}>
              <Link
                to="/"
                className={
                  activeTabId === linkItems[0].path
                    ? `link-item active-link`
                    : 'link-item'
                }
              >
                {linkItems[0].displayText}
              </Link>
            </li>
            <li key={linkItems[1].id}>
              <Link
                to="/cart"
                className={
                  activeTabId === linkItems[1].path
                    ? 'link-item active-link'
                    : 'link-item'
                }
              >
                {linkItems[1].displayText}
              </Link>
            </li>

            <li key={linkItems[3].id}>
              <Link
                to="/profile"
                className={
                  activeTabId === linkItems[3].path
                    ? 'link-item active-link'
                    : 'link-item'
                }
              >
                {linkItems[3].displayText}
              </Link>
            </li>
            <li key={linkItems[2].id}>
              <button
                className="desktop-logout"
                type="button"
                onClick={onClickLogout}
              >
                {linkItems[2].displayText}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)

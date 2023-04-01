import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="nf-container">
    <img
      src="https://res.cloudinary.com/dtkrnw0fu/image/upload/v1680088239/erroring_1_x03z9l.png"
      className="nf-image"
      alt="not found"
    />
    <h1 className="nf-heading">Page Not Found</h1>
    <p className="nf-note">
      we are sorry, the page you requested could not be found Please go back to
      the homepage
    </p>
    <Link to="/" className="nf-link">
      <button type="button" className="nf-button">
        Home Page
      </button>
    </Link>
  </div>
)
export default NotFound

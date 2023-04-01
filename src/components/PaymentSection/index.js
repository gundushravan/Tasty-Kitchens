import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const PaymentSection = () => (
  <div className="payment-section">
    <Header />
    <div className="payment-container">
      <div className="payment-card">
        <img
          src="https://i.postimg.cc/c1RF2q59/Vector.png"
          className="success-tick"
          alt="green tick"
        />
        <h1>Payment Successfull</h1>
        <p>Thank you for ordering Your payment is successfully completed.</p>
        <Link to="/">
          <button type="button" className="go-to-home-btn">
            Go To Home Page
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default PaymentSection

import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isError: false, errMsg: ''}

  onChangeUsername = e => {
    this.setState({username: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  onChangeCheckbox = e => {
    const passElement = document.querySelector('.passElementD')
    if (e.target.checked) {
      passElement.type = 'text'
    } else {
      passElement.type = 'password'
    }
  }

  onChangeCheckboxMobile = e => {
    const passElement = document.querySelector('.passElement')
    if (e.target.checked) {
      passElement.type = 'text'
    } else {
      passElement.type = 'password'
    }
  }

  onSubmitSuccess = JWTtoken => {
    const {history} = this.props
    Cookies.set('jwt_token', JWTtoken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({isError: true, errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isError, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="bg-container">
          <div className="login-details">
            <div className="card-cont">
              <div className="logo-cont">
                <img
                  src="https://res.cloudinary.com/dcxurp30f/image/upload/v1672746641/logo_wqzjft.png"
                  alt="website logo"
                  className="logo"
                />
                <h1 className="logo-title">Tasty Kitchens</h1>
              </div>
              <h1 className="login-txt">Login</h1>
              <form onSubmit={this.onSubmitForm}>
                <label htmlFor="user">USERNAME</label>
                <input
                  type="text"
                  id="user1"
                  placeholder="Username"
                  value={username}
                  onChange={this.onChangeUsername}
                />
                <label htmlFor="passD">PASSWORD</label>
                <input
                  type="password"
                  id="passD"
                  placeholder="Password"
                  className="passElementD"
                  value={password}
                  onChange={this.onChangePassword}
                />
                <div className="pass-check">
                  <input
                    type="checkbox"
                    id="showPassD"
                    className="checkbox"
                    onChange={this.onChangeCheckbox}
                  />
                  <label htmlFor="showPassD" className="label-pass">
                    Show Password
                  </label>
                </div>
                {isError && <p className="error">{errMsg}</p>}
                <button type="submit" className="login-btn">
                  Login
                </button>
              </form>
            </div>
          </div>
          <div className="img-cont">
            <img
              src="https://res.cloudinary.com/dcxurp30f/image/upload/v1672742515/Rectangle_1456_sbtwrd.png"
              alt="website login"
              className="login-img"
            />
          </div>
        </div>
        <div className="mobile-bg-container">
          <img
            src="https://res.cloudinary.com/dcxurp30f/image/upload/v1675138419/Rectangle_1457_jtwoto.png"
            alt="website login"
            className="mobile-img"
          />
          <form onSubmit={this.onSubmitForm}>
            <h1>Login</h1>
            <label htmlFor="userM">USERNAME</label>
            <input
              type="text"
              id="userM"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label htmlFor="passM">PASSWORD</label>
            <input
              type="password"
              id="passM"
              placeholder="Password"
              className="passElement"
              value={password}
              onChange={this.onChangePassword}
            />
            <div className="pass-check">
              <input
                type="checkbox"
                id="showPass"
                className="checkbox"
                onChange={this.onChangeCheckboxMobile}
              />
              <label htmlFor="showPass" className="label-pass">
                Show Password
              </label>
            </div>

            {isError && <p className="error">{errMsg}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </>
    )
  }
}

export default Login
